import * as io_client from 'socket.io-client';
import { SOCKET_IO_CONNECT, SOCKET_IO_DISCONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_ERROR, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_PING, SOCKET_IO_PONG } from '../common/CommonDefine';
import { LogMgr } from '../log/LogMgr';
import { MsgHandler } from '../msg_handler/MsgHandler';
import { MsgBase } from '../../message/message_server';

/** 
 *  负责socket.io客户端通信
 * 
 *  clientsession 支持的事件 写了一部分 需要用到的 可以在commondefine.ts里加
 *  connect
 * 	connect_error
 * 	connect_timeout
 * 	connecting
 * 	disconnect
 * 	error
 * 	reconnect
 * 	reconnect_attempt
 * 	reconnect_failed
 * 	reconnect_error
 * 	reconnecting
 * 	ping
 * 	pong
 */

export class ClientSession {
    /** 所属信息 */
    private masterID: number = 0;
    private masterName: string = '';
    /** 目的主机的URL */
    private url: string = '';
    /** 日志管理器 */
    private logger: LogMgr = null;
    /** 消息处理器 */
    private msgHandler: MsgHandler = null;
    /** socket */
    private sock: SocketIOClient.Socket = null;
    /** 事件需要自处理的函数 */
    private eventFunAry: any = {
        [SOCKET_IO_CONNECT]: null,
        [SOCKET_IO_DISCONNECT]: null,
        [SOCKET_IO_MESSAGE]: null,
        [SOCKET_IO_PING]: null,
        [SOCKET_IO_PONG]: null,
        [SOCKET_IO_CONNECT_ERROR]: null,
        [SOCKET_IO_ERROR]: null,
    };

    public constructor(masterID: number, masterName: string, logger: LogMgr) {
        this.masterID = masterID;
        this.masterName = masterName;
        this.logger = logger;
    }

    /** 设置事件自处理函数 */
    public SetEventFun(event: string, fun: Function) {
        this.eventFunAry[event] = fun;
    }

    /** 创建会话 */
    public CreateSession(ip: string, port: number, token: string) {
        try {
            this.url = 'http://' + ip + ':' + port + '?token=' + token;
            this.sock = io_client.connect(this.url);

            // 开启消息压缩开关
            this.sock.compress(true);
            // 注册事件对应处理函数
            // 连接成功
            this.sock.on(SOCKET_IO_CONNECT, this.eventFunAry[SOCKET_IO_CONNECT] == null ? this.OnConnect.bind(this) : this.eventFunAry[SOCKET_IO_CONNECT]);
            // 连接失败
            this.sock.on(SOCKET_IO_DISCONNECT, this.eventFunAry[SOCKET_IO_DISCONNECT] == null ? this.OnDisConnect.bind(this) : this.eventFunAry[SOCKET_IO_DISCONNECT]);
            // 收到消息
            this.sock.on(SOCKET_IO_MESSAGE, this.eventFunAry[SOCKET_IO_MESSAGE] == null ? this.OnRecv.bind(this) : this.eventFunAry[SOCKET_IO_MESSAGE]);
            // 发送心跳包
            // this.sock.on(SOCKET_IO_PING, this.eventFunAry[SOCKET_IO_PING] == null ? this.OnPing.bind(this) : this.eventFunAry[SOCKET_IO_PING]);
            // 收到心跳包
            // this.sock.on(SOCKET_IO_PONG, this.eventFunAry[SOCKET_IO_PONG] == null ? this.OnPong.bind(this) : this.eventFunAry[SOCKET_IO_PONG]);
            // 连接时错误(未建立socket)
            this.sock.on(SOCKET_IO_CONNECT_ERROR, this.eventFunAry[SOCKET_IO_CONNECT_ERROR] == null ? this.OnConnectError.bind(this) : this.eventFunAry[SOCKET_IO_CONNECT_ERROR]);
            // 连接中错误(已建立socket)
            this.sock.on(SOCKET_IO_ERROR, this.eventFunAry[SOCKET_IO_ERROR] == null ? this.OnError.bind(this) : this.eventFunAry[SOCKET_IO_ERROR]);

        } catch (error) {
            this.logger.Error('ClientSession CreateSession error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
    }

    /** 连接成功 */
    private OnConnect() {
        this.logger.Assert(this.masterID + '|' + this.masterName + ' ClientSession connect ' + this.url + ' success');
    }

    /** 收到消息 */
    private OnRecv(recvData: any) {
        let msgID: number = 0;
        try {
            this.msgHandler.MessageHandle(recvData);
        } catch (error) {
            this.sock.close();
            this.logger.Error('ClientSession OnRecv Error!!! master: ' + this.masterID + '|' + this.masterName + ' msgID: ' + msgID, error);
        }
    }

    /** 连接断开 */
    private OnDisConnect(info: any) {
        try {
            this.logger.Info("ClientSession disConnect!!!", info);
            this.sock.close();
        } catch (error) {
            this.logger.Warn(info, error);
        }
    }

    /** 连接时错误(未建立socket) */
    private OnConnectError(e: any) {
        try {
            this.sock.close();
            this.logger.Error("ClientSession connect_error!!! master: " + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
    }

    /** 连接中错误(已建立socket) */
    private OnError(e: any) {
        try {
            this.sock.close();
            this.logger.Error("ClientSession error!!! master: " + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
    }

    /** 发送心跳包 */
    private OnPing() {
        this.logger.Assert(this.masterID + '|' + this.masterName + ' ping')
    }

    /** 收到心跳包 */
    private OnPong() {
        this.logger.Assert(this.masterID + '|' + this.masterName + ' pong')
    }

    /** 发送消息 */
    public Send(data: any) {
        try {
            this.sock.send(data);
        } catch (error) {
            this.sock.close();
            this.logger.Error(data, error);
        }
    }

}