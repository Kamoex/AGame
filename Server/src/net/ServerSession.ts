import { SOCKET_IO_CONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR, HEART_BEAT_TIME_OUT, HEART_BEAT_TIME_INTERVAL } from "../common/CommonDefine";
import { MsgBase } from "../../message/message_server";
import { LogMgr } from "../log/LogMgr";
import { MsgHandler } from "../msg_handler/MsgHandler";
import { LoginServerCfg } from "../LoginServerCfg";
import * as scio from 'socket.io'
import { IConnector } from "./Connector";
var io = require("socket.io");

export class ServerSession {
    /** 所属信息 */
    private nMasterID: number;
    private sMasterName: string;
    /** serverio.server信息 */
    private serverIO: SocketIO.Server;
    /** sokcet管理 */
    private infos: SocketIO.Namespace;
    /** 日志管理器 */
    private logger: LogMgr;
    /** 成功连接时需要执行的自定义函数 参数 socket: SocketIO.Socket*/
    private callWhenConnected: Function;
    /** 连接上来的客户端 */
    private connectors: {[key: string]: IConnector} = {};


    public constructor(masterID: number, masterName: string, logger: LogMgr, fun: Function) {
        this.nMasterID = masterID;
        this.sMasterName = masterName;
        this.logger = logger;
        this.callWhenConnected = fun;
    }


    /** 添加客户端 */
    public AddConnector(socket: SocketIO.Socket, con: IConnector) {
        this.connectors[socket.id] = con;
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
            this.logger.Error('ServerSession createSession error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
        }
    }

    /** 建立连接前的过滤器 */
    private Allow(request: any, cb: (err: number, success: boolean) => void) {
        try {
            if (!request._query || request._query.token != LoginServerCfg.token) {
                this.logger.Warn('master: ' + this.nMasterID + '|' + this.sMasterName + 'client token error: recv_token = ' + request._query.token)
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
            this.logger.Error('ServerSession onConnected error!!! master: ' + this.nMasterID + '|' + this.sMasterName + ' socket: ' + socket, error);
        }
    }

    /** 接收消息 */
    private OnRecv(socket: SocketIO.Socket, recvData: any): void {
        this.connectors[socket.id].OnRecv(recvData);
    }

    /** 断开连接与客户端 */
    private OnDisconnect(socket: SocketIO.Socket, info: any): void {
        this.connectors[socket.id].OnDisconnect(info);
    }

    /** 错误 */
    private OnError(socket: SocketIO.Socket, e: any): void {
        this.connectors[socket.id].OnError(e);
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
            this.logger.Error('ServerSession Send error!!! master: ' + this.nMasterID + '|' + this.sMasterName + 'data: ' + data, error);
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
            this.logger.Error('ServerSession Send error!!! master: ' + this.nMasterID + '|' + this.sMasterName + 'data: ' + data, error);
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
