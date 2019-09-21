import * as io_client from 'socket.io-client';
import { SOCKET_IO_CONNECT, SOCKET_IO_DISCONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_ERROR, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_PING, SOCKET_IO_PONG, SOCKET_IO_RECONNECT_ERROR, SOCKET_IO_RECONNECT, ERROR_NONE } from '../common/CommonDefine';
import { LogMgr } from '../log/LogMgr';
import { MsgBase } from '../../message/message_server';
import { MsgHandler } from '../msg_handler/MsgHandler';
import { ICConnector } from './Connector';

/** 
 *  负责socket.io客户端通信
 * 
 *  clientsession 支持的事件 写了一部分 需要用到的 可以在commondefine.ts和ICConnector里加
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
    private nMasterID: number = 0;
    private sMasterName: string = '';
    /** 目的主机的URL */
    public sUrl: string = '';
    /** 日志管理器 */
    private logger: LogMgr = null;
    /** socket */
    private sock: SocketIOClient.Socket = null;
    /** 连接处理 */
    private connector: ICConnector = null;
    /** 是否是重连 */
    private bReconnect: boolean = false;
    /** 成功连接时需要执行的自定义函数 参数 socket: SocketIO.Socket*/
    private callWhenConnected: Function;

    public constructor(masterID: number, masterName: string, logger: LogMgr) {
        this.nMasterID = masterID;
        this.sMasterName = masterName;
        this.logger = logger;
    }

    public Init(con: ICConnector) {
        this.connector = con;
        this.connector.OnDisconnect("dd");
    }

    /** 创建会话 */
    public CreateSession(ip: string, port: number, token: string, cb: Function) {
        try {
            this.sUrl = 'http://' + ip + ':' + port + '?token=' + token;
            this.sock = io_client.connect(this.sUrl, {
                reconnection: true,
                reconnectionAttempts: Infinity,      // 无限重连
                reconnectionDelay: 2000,             // 重连间隔时间 2s一次
                randomizationFactor: 1,              // 重连时间的随机参数 不让随机
                transports: ['websocket', 'polling'] // 默认用websocket模式
            });

            this.callWhenConnected = cb;
            // 开启消息压缩开关
            this.sock.compress(true);
            // 注册事件对应处理函数
            // 连接成功
            this.sock.on(SOCKET_IO_CONNECT, this.OnConnected.bind(this));
            // 连接失败
            this.sock.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this));
            // 重连成功
            this.sock.on(SOCKET_IO_RECONNECT, this.OnReConnect.bind(this));
            // 重连失败
            this.sock.on(SOCKET_IO_RECONNECT_ERROR, this.OnReConnectError.bind(this));
            // 收到消息
            this.sock.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this));
            // 发送心跳包
            this.sock.on(SOCKET_IO_PING, this.OnPing.bind(this));
            // 收到心跳包
            this.sock.on(SOCKET_IO_PONG, this.OnPong.bind(this));
            // 连接时错误(未建立socket)
            this.sock.on(SOCKET_IO_CONNECT_ERROR, this.OnConnectError.bind(this));
            // 连接中错误(已建立socket)
            this.sock.on(SOCKET_IO_ERROR, this.OnError.bind(this));
        } catch (error) {
            this.logger.Error('ClientSession CreateSession error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
        }
    }

    /** 连接成功 */
    private OnConnected() {
        try {
            if(this.bReconnect)
                return;
            this.callWhenConnected();
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnConnect Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 重连成功 */
    private OnReConnect(attempNum: number) {
        try {
            this.bReconnect = true;
            this.connector.OnReConnect(attempNum);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnReConnect Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 收到消息 */
    private OnRecv(recvData: any) {
        try {
            this.connector.OnRecv(recvData);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnRecv Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 连接断开 */
    private OnDisConnect(info: any) {
        try {
            this.connector.OnDisconnect(info);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnDisConnect Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 连接时错误(未建立socket) */
    private OnConnectError(e: any) {
        try {
            this.connector.OnConnectError(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnConnectError Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 连接中错误(已建立socket) */
    private OnError(e: any) {
        try {
            this.connector.OnError(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnError Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 重连失败 */
    private OnReConnectError(e: any) {
        try {
            this.connector.OnReConnectError(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('ClientSession OnReConnectError Error!!! master: ' + this.nMasterID + '|' + this.sMasterName, error);
            }
        }
    }

    /** 发送心跳包 */
    private OnPing() {
        this.connector.OnPing();
        // this.sock.send("ping");
        // this.logger.Assert(this.nMasterID + '|' + this.sMasterName + ' ping')
    }

    /** 收到心跳包 */
    private OnPong() {
        this.connector.OnPong();
        // this.logger.Assert(this.nMasterID + '|' + this.sMasterName + ' pong')
    }

    /** 发送消息 */
    public Send(data: any) {
        let msgID: number = 0;
        let msgName: string = data.constructor.name;
        try {
            let msg: MsgBase.MessageHead = MsgBase.MessageHead.create();
            msgID = MsgHandler.GetMsgKey(data.constructor.name);
            if (msg.nMsgID == undefined || msg.nMsgID == null) {
                this.logger.Error("msgid is null!!! msg_name: " + data.constructor.name, null);
                return null;
            }
            msg.nMsgID = msgID;
            msg.data = data.constructor.encode(data).finish();
            msg.nMsgLength = msg.data.byteLength;
            this.sock.send(MsgBase.MessageHead.encode(msg).finish());
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                this.logger.Error('MessageHandleForLogin error!!!' + ' msgID: ' + msgID + ' msgName: ' + msgName + ' ', error);
            }
        }
    }

}