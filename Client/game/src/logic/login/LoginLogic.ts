import { Logger } from "../../util/Logger";
import { SOCKET_IO_CONNECT, SOCKET_IO_CONNECT_ERROR, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECT, SOCKET_IO_ERROR, SOCKET_IO_RECONNECT, SOCKET_IO_RECONNECT_ERROR } from "../CommonDefine";
import GameConfig from "../../GameConfig";
import { MsgHandler } from "../net/MsgHandler";
import { Session } from "../net/Session";
import { IConnector } from "../net/Connector";


/**
 * login模块儿逻辑
 * 1.负责连接Login
 * 2.负责处理Login消息
 */
export class LoginLogic implements IConnector {
    /** login服务器连接配置 */
    private readonly CONNECT_SRV_CFG: string = "ConnectSrvCfg.json";
    private connectSrvCfg: any;
    /** 服务器地址 */
    private serverHost: string;

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
    }

    private onLoaded() {
        this.connectSrvCfg = Laya.Loader.getRes(this.CONNECT_SRV_CFG);
        let conSrv: string = this.connectSrvCfg.connect_srv;
        this.serverHost = this.connectSrvCfg[conSrv].url + "?token=" + this.connectSrvCfg[conSrv].token;

        // 初始化session
        Session.GetInstance().Init(this);
        // 连接login
        this.ConnectLogin();
    }

    /** 连接login服务器 */
    public ConnectLogin(): void {
        Session.GetInstance().ConnectServer(this.serverHost);
    }

    /** 连接成功 */
    public OnConnected() {
        Logger.Info("连接服务器成功: " + this.serverHost);
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }

    /** 重连成功 */
    public OnReConnect(attempNum: number) {
        Logger.Info("重新连接服务器成功: " + this.serverHost);
    }

    /** 重连错误 */
    public OnReConnectError(e: any) {
        Logger.Info("LoginServer OnReConnectError!!!", e);
    }

    /** 收到消息 */
    public OnRecv(recvData: any) {
        let buffer = new Uint8Array(recvData);
        MsgHandler.HandleFromLogin(buffer);
    }

    /** 发送心跳包 */
    public OnPing() {

    }

    /** 收到心跳包 */
    public OnPong() {

    }

    /** 连接断开 */
    public OnDisconnect(info: any) {
        Logger.Info("LoginServer disConnect!!!", info);
    }

    /** 连接时错误(未建立socket) */
    public OnConnectError(e: any) {
        Logger.Error("LoginLogic OnConnectError!!!", e);
    }

    /** 连接中错误(已建立socket) */
    public OnError(e: any) {
        Logger.Error("LoginLogic OnError!!!", e);
    }

    /** 向login发送消息 */
    public SendMsg(data: any) {
        Logger.Info("SendMsg to LoginServer!!!", data);
        Session.GetInstance().Send(data);
    }

    private onVersionLoaded(): void {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }

    private onConfigLoaded(): void {
        //加载IDE指定的场景
        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    }

}