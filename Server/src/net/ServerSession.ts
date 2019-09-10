import { SOCKET_IO_CONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR, HEART_BEAT_TIME_OUT, HEART_BEAT_TIME_INTERVAL } from "../common/CommonDefine";
import { MsgBase } from "../../message/message_server";
import { LogMgr } from "../log/LogMgr";
import { MsgHandler } from "../msg_handler/MsgHandler";
import { LoginServerCfg } from "../LoginServerCfg";
import * as scio from 'socket.io'
var io = require("socket.io");

export class ServerSession {
    /** 所属信息 */
    private masterID: number;
    private masterName: string;
    /** serverio.server信息 */
    private serverIO: SocketIO.Server;
    /** sokcet管理 */
    private infos: SocketIO.Namespace;
    /** 日志管理器 */
    private logger: LogMgr;
    /** 成功连接时需要执行的自定义函数 参数 socket: SocketIO.Socket*/
    private callWhenConnected: Function;

    /** 事件需要自处理的函数 */
    private eventFunAry: any = {
        [SOCKET_IO_CONNECT]: null,
        [SOCKET_IO_DISCONNECT]: null,
        [SOCKET_IO_MESSAGE]: null,
        [SOCKET_IO_ERROR]: null,
    };

    public constructor(masterID: number, masterName: string, logger: LogMgr, fun: Function) {
        this.masterID = masterID;
        this.masterName = masterName;
        this.logger = logger;
        this.callWhenConnected = fun;
    }

    /** 设置事件自处理函数 */
    public SetEventFun(event: string, fun: Function) {
        this.eventFunAry[event] = fun;
    }

    /** 创建服务器session */
    public CreateSession(nPort: number) {
        try {
            // 创建socket.io
            this.serverIO = new io(nPort, {
                pingTimeout: HEART_BEAT_TIME_OUT * 1000,
                pingInterval: HEART_BEAT_TIME_INTERVAL * 1000,
                allowRequest: this.Allow.bind(this)
            });
            // 连接处理
            this.infos = this.serverIO.on(SOCKET_IO_CONNECT, this.OnConnected.bind(this));
        } catch (error) {
            this.logger.Error('ServerSession createSession error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
    }

    /** 建立连接前的过滤器 */
    private Allow(request: any, cb: (err: number, success: boolean) => void) {
        try {
            if (!request._query || request._query.token != LoginServerCfg.token) {
                this.logger.Warn('master: ' + this.masterID + '|' + this.masterName + 'client token error: recv_token = ' + request._query.token)
                // 不允许连接
                return cb(0, false)
            }
            // 允许连接
            cb(0, true);
        } catch (error) {
            this.logger.Error('ServerSession Allow error!!!', error);
        }
    }

    /** 连接成功 */
    private OnConnected(socket: SocketIO.Socket) {
        try {
            console.log('a client connected!!! socket_id: ' + socket.id + ' sockets: ' + this.infos.sockets);
            // 执行自定义函数
            this.callWhenConnected(socket)
            // 开启消息压缩开关
            socket.compress(true);
            socket.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this, socket));
            // 断线处理
            socket.on(SOCKET_IO_DISCONNECT, this.OnDisconnect.bind(this, socket));
            // 错误处理
            socket.on(SOCKET_IO_ERROR, this.OnError.bind(this, socket));
        } catch (error) {
            this.logger.Error('ServerSession onConnected error!!! master: ' + this.masterID + '|' + this.masterName + ' socket: ' + socket, error);
        }
    }

    /** 接收消息 */
    private OnRecv(socket: SocketIO.Socket, recvData: any): void {
        try {
            if (this.eventFunAry[SOCKET_IO_MESSAGE]) {
                this.eventFunAry[SOCKET_IO_MESSAGE](recvData);
            }
            else {
                this.logger.Error('Forget Set OnRecv Function!!!');
            }
        } catch (error) {
            socket.disconnect(true);
            this.logger.Error('ServerSession OnRecv Error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
    }

    /** 断开连接与客户端 */
    private OnDisconnect(socket: SocketIO.Socket, info: any): void {
        try {
            if (this.eventFunAry[SOCKET_IO_DISCONNECT]) {
                this.eventFunAry[SOCKET_IO_DISCONNECT](socket, info);
            }
            else {
                console.log("client disconnect: ", info);
            }
            socket.disconnect(true)
        } catch (error) {
            this.logger.Error('ServerSession OnDisconnect Error!!! master: ' + this.masterID + '|' + this.masterName + ' info: ' + info, error);
        }
    }

    /** 错误 */
    private OnError(socket: SocketIO.Socket, e: any): void {
        try {
            socket.disconnect(true);
            this.logger.Error('ServerSession OnRecv Error!!! error: ' + e);
        } catch (error) {
            this.logger.Error('ServerSession OnError Error!!! master: ' + this.masterID + '|' + this.masterName + ' error: ' + e, error);
        }
    }

    /** 发送消息 */
    public Send(socket: SocketIO.Socket, data: any): void {
        try {
            let msg: Uint8Array = this.EncodeMsg(data);
            if (!msg) {
                this.logger.Error("msgid is null!!! msg_name: " + data.constructor.name);
                return;
            }
            socket.send(msg);
            console.log("send data: ", data);
        } catch (error) {
            this.logger.Error('ServerSession Send error!!! master: ' + this.masterID + '|' + this.masterName + 'data: ' + data, error);
        }
    }

    /** 发送消息 */
    public BroadCast(data: any): void {
        try {
            let msg: Uint8Array = this.EncodeMsg(data);
            if (!msg) {
                this.logger.Error("msgid is null!!! msg_name: " + data.constructor.name);
                return;
            }
            this.serverIO.send(msg)
            console.log("broadcast data: ", data);
        } catch (error) {
            this.logger.Error('ServerSession Send error!!! master: ' + this.masterID + '|' + this.masterName + 'data: ' + data, error);
        }
    }

    /** 组建消息 */
    private EncodeMsg(data: any): Uint8Array {
        let msg: MsgBase.MessageHead = MsgBase.MessageHead.create();

        let msgID: number = MsgHandler.GetMsgKey(data.constructor.name);
        if (msg.nMsgID == undefined || msg.nMsgID == null) {
            this.logger.Error("msgid is null!!! msg_name: " + data.constructor.name, null);
            return null;
        }
        msg.nMsgID = msgID;
        msg.data = data.constructor.encode(data).finish();
        msg.nMsgLength = msg.data.byteLength;
        return MsgBase.MessageHead.encode(msg).finish();
    }

}
