import * as io_client from 'socket.io-client';
import { SOCKET_IO_CONNECT, SOCKET_IO_DISCONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_ERROR, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_PING, SOCKET_IO_PONG } from '../common/CommonDefine';
import { LogMgr } from '../log/LogMgr';
import { MsgBase } from '../../message/message_server';
import { MsgHandler } from '../msg_handler/MsgHandler';

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
            this.sock.on(SOCKET_IO_CONNECT, this.OnConnect.bind(this));
            // 连接失败
            this.sock.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this));
            // 收到消息
            this.sock.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this));
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
        try {
            if (this.eventFunAry[SOCKET_IO_CONNECT]) {
                this.eventFunAry[SOCKET_IO_CONNECT]();
            }
            this.logger.Assert('connect login success!!!');
        } catch (error) {
            this.logger.Error('ClientSession OnConnect error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
        this.logger.Assert(this.masterID + '|' + this.masterName + ' ClientSession connect ' + this.url + ' success');
    }

    /** 收到消息 */
    private OnRecv(recvData: any) {
        try {
            if (this.eventFunAry[SOCKET_IO_MESSAGE]) {
                this.eventFunAry[SOCKET_IO_MESSAGE](recvData);
            }
            else {
                this.logger.Error('ClientSession OnRecv Error!!! ' + this.masterID + '|' + this.masterName)
            }
        } catch (error) {
            this.sock.close();
            this.logger.Error('ClientSession OnRecv Error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
    }

    /** 连接断开 */
    private OnDisConnect(info: any) {
        try {
            if (this.eventFunAry[SOCKET_IO_DISCONNECT]) {
                this.eventFunAry[SOCKET_IO_DISCONNECT](info);
            }
            this.logger.Info('ClientSession disConnect!!!', info);
        } catch (error) {
            this.logger.Warn(info, error);
        }
        this.sock.close();
    }

    /** 连接时错误(未建立socket) */
    private OnConnectError(e: any) {
        try {
            if (this.eventFunAry[SOCKET_IO_CONNECT_ERROR]) {
                this.eventFunAry[SOCKET_IO_CONNECT_ERROR](e);
            }
            this.logger.Error('ClientSession connect_error!!! master: ' + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
        this.sock.close();
    }

    /** 连接中错误(已建立socket) */
    private OnError(e: any) {
        try {
            if (this.eventFunAry[SOCKET_IO_ERROR]) {
                this.eventFunAry[SOCKET_IO_ERROR](e);
            }
            this.logger.Error('ClientSession error!!! master: ' + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
        this.sock.close();
    }

    /** 发送心跳包 */
    private OnPing() {
        if (this.eventFunAry[SOCKET_IO_PING]) {
            this.eventFunAry[SOCKET_IO_PING]();
        }
        this.logger.Assert(this.masterID + '|' + this.masterName + ' ping')
    }

    /** 收到心跳包 */
    private OnPong() {
        if (this.eventFunAry[SOCKET_IO_PONG]) {
            this.eventFunAry[SOCKET_IO_PONG]();
        }
        this.logger.Assert(this.masterID + '|' + this.masterName + ' pong')
    }

    /** 发送消息 */
    public Send(data: any) {
        try {
            let msg: MsgBase.MessageHead = MsgBase.MessageHead.create();
            let msgID: number = MsgHandler.GetMsgKey(data.constructor.name);
            if (msg.nMsgID == undefined || msg.nMsgID == null) {
                this.logger.Error("msgid is null!!! msg_name: " + data.constructor.name, null);
                return null;
            }
            msg.nMsgID = msgID;
            msg.data = data.constructor.encode(data).finish();
            msg.nMsgLength = msg.data.byteLength;
            this.sock.send(MsgBase.MessageHead.encode(msg).finish());
        } catch (error) {
            this.sock.close();
            this.logger.Error(data, error);
        }
    }

}