import { Logger } from "../../util/Logger";
import { SOCKET_IO_CONNECT, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR, SOCKET_IO_RECONNECT, SOCKET_IO_RECONNECT_ERROR, ERROR_NONE } from "../CommonDefine";
import GameConfig from "../../GameConfig";
import { MsgHandler } from "../net/MsgHandler";
import { IConnector } from "./Connector";


/**
 * login模块儿逻辑
 * 1.负责连接Login
 * 2.负责处理Login消息
 */
export class Session {
    /** login服务器连接配置 */
    private readonly CONNECT_SRV_CFG: string = "ConnectSrvCfg.json";
    private connectSrvCfg: any;
    /** 连接处理逻辑 */
    private connector: IConnector;
    /** 连接服务器信息 */
    private socketIO: SocketIOClient.Socket;
    private sServerHost: string;
    /** 连接状态 */
    private bConnected: boolean = false;
    /** 重连状态 */
    private bReConnect: boolean = false;

    private static ins: Session = null;
    private constructor() { }
    public static GetInstance(): Session {
        if (!Session.ins) {
            Session.ins = new Session();
        }
        return Session.ins;
    }

    public Init(con: IConnector) {
        this.connector = con;
    }

    /** 连接login服务器 */
    public ConnectServer(url: string): void {
        if (this.IsConnect()) {
            if(this.sServerHost == url) {
                Logger.Info("client已与 url: " + this.sServerHost + "连接");
                return;
            }
            Logger.Info("client目前正与 url: " + this.sServerHost + "连接");
            Logger.Info("client将连接到 url: " + url);
            this.SetReConnect(false);
        }
        this.sServerHost = url;
        Logger.Info("开始连接服务器服务器: " + this.sServerHost);
        try {
            this.socketIO = io.connect(this.sServerHost, {
                reconnection: true,
                reconnectionAttempts: Infinity,         // 无限重连
                reconnectionDelay: 2000,                // 重连间隔时间 2s一次
                randomizationFactor: 1,                 // 重连时间的随机参数 不让随机
                transports: ['websocket', 'polling']    // 默认用websocket模式
            });
            this.socketIO.on(SOCKET_IO_CONNECT, this.OnConnect.bind(this));
            this.socketIO.on(SOCKET_IO_RECONNECT, this.OnReConnect.bind(this));
            this.socketIO.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this));
            this.socketIO.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this));
            this.socketIO.on(SOCKET_IO_ERROR, this.OnError.bind(this));
            this.socketIO.on(SOCKET_IO_RECONNECT_ERROR, this.OnReConnectError.bind(this));
            this.socketIO.on(SOCKET_IO_CONNECT_ERROR, this.OnConnectError.bind(this));

        } catch (error) {
            Logger.Error("Session connect err!!!", error);
        }
    }

    /** 连接成功 */
    private OnConnect() {
        try {
            if (this.IsReConnect())
                return;
            this.SetConnect(true);
            this.connector.OnConnected();
        } catch (error) {
            Logger.Error("Session OnConnect Error!", error);
        }
    }

    /** 重连成功 */
    private OnReConnect(attempts: number) {
        try {
            this.SetReConnect(false);
            this.SetConnect(true);
            this.connector.OnReConnect(attempts);
        } catch (error) {
            Logger.Error("Session OnReConnect Error!", error);
        }

    }

    /** 收到消息 */
    private OnRecv(recvData: any) {
        try {
            this.connector.OnRecv(recvData);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                Logger.Error('Session OnRecv Error!!! ', error);
            }
        }
    }

    /** 连接断开 */
    private OnDisConnect(info: any) {
        try {
            this.SetReConnect(true);
            this.SetConnect(false);
            this.connector.OnDisconnect(info);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                Logger.Error(info, error);
            }
        }
    }

    /** 连接时错误(未建立socket) */
    private OnConnectError(e: any) {
        try {
            this.connector.OnDisconnect(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                Logger.Error("Session OnConnectError", error);
            }
        }
    }

    /** 连接中错误(已建立socket) */
    private OnError(e: any) {
        try {
            this.connector.OnError(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                Logger.Error("Session OnError!!!", error);
            }
        }
    }

    /** 重新连接报错 */
    private OnReConnectError(e: any) {
        try {
            this.connector.OnReConnectError(e);
        } catch (error) {
            if (error instanceof Error && error.message != ERROR_NONE) {
                Logger.Error("OnReConnectError error!!!", e);
            }
        }
    }

    /** 向login发送消息 */
    public Send(data: any) {
        try {
            this.socketIO.send(data);
        } catch (error) {
            Logger.Error(error);
        }
    }

    private SetConnect(state: boolean) {
        this.bConnected = state;
    }

    public IsConnect(): boolean {
        return this.bConnected;
    }

    private SetReConnect(state: boolean) {
        this.bReConnect = state;
    }

    public IsReConnect(): boolean {
        return this.bReConnect;
    }
}