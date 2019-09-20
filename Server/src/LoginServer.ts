import { MariaDBMgr } from "./db/MariaDBMgr";
import { LoginServerCfg } from "./LoginServerCfg";
import { ServerSession } from "./net/ServerSession";
import { LoginLog } from "./log/LogMgr";
import { LoginServerMsgHandler } from "./msg_handler/LoginServerMsgHandler";
import { LoginGSLogic } from "./logic/Login/LoginGSLogic";
import { LoginUser } from "./logic/Login/LoginUser";


export class LoginServer {

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    /** client连接信息处理 */
    private clSession: ServerSession = null;
    /** gameserver连接信息处理 */
    private gsSession: ServerSession = null;

    private static ins: LoginServer = null;
    private constructor() { }
    public static GetInstance(): LoginServer {
        if (!LoginServer.ins)
            LoginServer.ins = new LoginServer();
        return LoginServer.ins;
    }

    /** 初始化服务器 */
    public async Init() {
        // 消息注册
        LoginServerMsgHandler.GetInstance().MessageRegist();
        // DB初始化
        await this.mariaDB.Init(LoginServerCfg.mariadb_cfg);
        // 初始化session
        this.gsSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, LoginLog, this.OnGameServerConnected.bind(this));
        this.clSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, LoginLog, this.OnClientConnected.bind(this));
    }

    /** 启动服务器 */
    public StartServer() {
        this.clSession.CreateSession(LoginServerCfg.client_port);
        this.gsSession.CreateSession(LoginServerCfg.gs_port);
    }


    /** 接收到gameserver的连接 */
    public OnGameServerConnected(socket: SocketIO.Socket, data: any) {
        let gsLogic: LoginGSLogic = new LoginGSLogic();
        gsLogic.Init(socket, this.gsSession);
        this.gsSession.AddConnector(socket.id, gsLogic);
        gsLogic.OnConnected();
    }

    public GetGSSession(): ServerSession {
        return this.gsSession;
    }














    /** 接收到client的连接 */
    public OnClientConnected(socket: SocketIO.Socket, data: any) {
        let clLogic: LoginUser = new LoginUser();
        clLogic.Init(socket, this.clSession);
        this.clSession.AddConnector(socket.id, clLogic);
        clLogic.OnConnected();
    }

    public GetCLSession(): ServerSession {
        return this.clSession;
    }

}











let paramAry = process.argv.slice(2);

/** 启动loginserver */
async function StartLoginServer(param: string) {
    if (param != "st_lg") {
        return;
    }
    try {
        // 读取配置表

        await LoginServer.GetInstance().Init();
        await LoginServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
        debugger;
    }
}

StartLoginServer(paramAry[0]);
