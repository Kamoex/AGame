import { Logger } from "../../util/Logger";
import { SOCKET_IO_CONNECT, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR } from "../CommonDefine";
import GameConfig from "../../GameConfig";
import { MsgHandler } from "../net/MsgHandler";


/**
 * login模块儿逻辑
 * 1.负责连接Login
 * 2.负责处理Login消息
 */
export class LoginLogic {
    /** login服务器连接配置 */
    private readonly CONNECT_SRV_CFG: string = "ConnectSrvCfg.json";
    private connectSrvCfg: any;
    /** 连接服务器信息 */
    private socketIO: SocketIOClient.Socket;
    private serverHost: string;
    /** 连接状态 */
    private connected: boolean = false;

    private static ins: LoginLogic = null;
    private constructor() { }
    public static GetInstance(): LoginLogic {
        if (!LoginLogic.ins)
            LoginLogic.ins = new LoginLogic();
        return LoginLogic.ins;
    }

    public Init() {
        // 读取连接的login配置
        Laya.loader.load(
            [
                // 加载配置
                { "url": this.CONNECT_SRV_CFG }
                // 加载图集
                // { "url": "./res/atlas/img.atlas" }
            ],
            Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON
        );
        // 消息注册
        MsgHandler.MessageRegist();
    }

    private onLoaded() {
        let ddd = Laya.Loader.getRes(this.CONNECT_SRV_CFG);
        this.connectSrvCfg = Laya.Loader.getRes(this.CONNECT_SRV_CFG);
        let conSrv: string = this.connectSrvCfg.connect_srv;
        this.serverHost = this.connectSrvCfg[conSrv].url + "?token=" + this.connectSrvCfg[conSrv].token;
        // 连接login
        this.ConnectLogin();
    }

    /** 连接login服务器 */
    public ConnectLogin(): void {
        if(this.IsConnect()) {
            Logger.Info("与login服务器已经连接! url: " + this.serverHost);
            return;
        }
        Logger.Info("开始连接服务器服务器: " + this.serverHost);
        try {
            this.socketIO = io.connect(this.serverHost);
            this.socketIO.on(SOCKET_IO_CONNECT, this.OnConnect.bind(this))
            this.socketIO.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this))
            this.socketIO.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this))
            this.socketIO.on(SOCKET_IO_ERROR, this.OnError.bind(this))
            this.socketIO.on(SOCKET_IO_CONNECT_ERROR, this.OnConnectError.bind(this))

        } catch (error) {
            Logger.Info("Session connect err!!!", error.stack);
            debugger;
        }
    }

    /** 连接成功 */
    private OnConnect() {
        Logger.Info("连接服务器成功: " + this.serverHost);
        this.SetConnect(true);
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }

    onVersionLoaded(): void {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }

    onConfigLoaded(): void {
        //加载IDE指定的场景
        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    }

    /** 收到消息 */
    private OnRecv(recvData: any) {
        let msgID: number = 0;
        try {
            let buffer = new Uint8Array(recvData);
            MsgHandler.HandleFromLogin(buffer);
        } catch (error) {
            this.socketIO.close();
            Logger.Error('ClientSession OnRecv Error!!! msgID: ' + msgID, error);
        }
    }

    /** 连接断开 */
    private OnDisConnect(info: any) {
        try {
            Logger.Info("ClientSession disConnect!!!", info);
            this.socketIO.close();
        } catch (error) {
            this.socketIO.close();
            Logger.Warn(info, error);
        }
        this.SetConnect(false);
    }

    /** 连接时错误(未建立socket) */
    private OnConnectError(e: any) {
        try {
            this.socketIO.close();
            Logger.Error("ClientSession connect_error!!!", e);
        } catch (error) {
            this.socketIO.close();
            Logger.Error(e, error);
        }
        this.SetConnect(false);
    }

    /** 连接中错误(已建立socket) */
    private OnError(e: any) {
        try {
            this.socketIO.close();
            Logger.Error("ClientSession error!!!", e);
        } catch (error) {
            this.socketIO.close();
            Logger.Error(e, error);
        }
        this.SetConnect(false);
    }

    /** 向login发送消息 */
    private Send(data: any) {
        try {
            this.socketIO.send(data);
        } catch (error) {
            this.socketIO.close();
            Logger.Error(data, error);
        }
    }

    public SetConnect(state: boolean) {
        this.connected = state;
    }

    public IsConnect(): boolean {
        return this.connected;
    }

}