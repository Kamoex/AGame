import { SOCKET_IO_CONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR, HEART_BEAT_TIME_OUT, HEART_BEAT_TIME_INTERVAL } from "../common/CommonDefine";
import { MsgBase } from "../../message/message_server";
import { LogMgr } from "../log/LogMgr";
import { MsgHandler } from "../msg_handler/MsgHandler";
import { LoginServerCfg } from "../LoginServerCfg";
import * as http from "http";
var io = require("socket.io");
import * as io2 from 'socket.io'

export class ServerSession {
    /** 所属信息 */ 
    private masterID: number;
    private masterName: string;
    /** 消息处理器 */ 
    private msgHandler: MsgHandler;
    /** serverio.server信息 */ 
    private serverIO: SocketIO.Server;
    /** sokcet管理 */ 
    private infos: SocketIO.Namespace;
    /** 日志管理器 */ 
    private logger: LogMgr;

    public constructor(masterID: number, masterName: string, msgHandler: MsgHandler, logger: LogMgr) {
        this.masterID = masterID;
        this.masterName = masterName;
        this.msgHandler = msgHandler;
        this.logger = logger;
    }

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
            if(!request._query || request._query.token != LoginServerCfg.token) {
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
            // 开启消息压缩开关
            
            socket.compress(true);
            // 消息处理
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
        let msgID: number = 0;
        try {
            this.msgHandler.MessageHandle(recvData);
        } catch (error) {
            socket.disconnect(true);
            this.logger.Error('ServerSession OnRecv Error!!! master: ' + this.masterID + '|' + this.masterName + ' msgID: ' + msgID, error);
        }
    }

    /** 发送消息 */
    public Send(socket: SocketIO.Socket, data: any): void {
        try {
            socket.send(data);
            console.log("send data: ", data);
        } catch (error) {
            this.logger.Error('ServerSession Send error!!! master: ' + this.masterID + '|' + this.masterName + 'data: ' + data, error);
        }
    }

    /** 断开连接与客户端 */
    private OnDisconnect(socket: SocketIO.Socket, info: any): void {
        try {
            socket.disconnect(true)
            console.log("client disconnect: ", info);
        } catch (error) {
            this.logger.Error('ServerSession OnDisconnect Error!!! master: ' + this.masterID + '|' + this.masterName + ' info: ' + info, error);
        }
    }

    /** 错误 */
    private OnError(socket: SocketIO.Socket, e: any): void {
        try {
            socket.disconnect(true);
            this.logger.Error('ServerSession OnRecv Error!!! error: ' + e, null);
        } catch (error) {
            this.logger.Error('ServerSession OnError Error!!! master: ' + this.masterID + '|' + this.masterName + ' error: ' + e, error);
        }
    }

}
