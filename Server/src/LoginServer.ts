import { MariaDBMgr } from "./db/MariaDBMgr";
import { LoginServerCfg } from "./LoginServerCfg";
import { ServerSession } from "./net/ServerSession";
import { LoginLog } from "./log/LogMgr";
import { LoginServerMsgHandler } from "./msg_handler/LoginServerMsgHandler";
import { LoginGSLogic } from "./logic/Login/LoginGSLogic";
import { LoginUser } from "./logic/Login/LoginUser";
import { MsgLC } from "../message/message_server";


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
        this.gsSession.AddConnector(socket, gsLogic);
        gsLogic.OnConnected();
    }

    public GetGSSession(): ServerSession {
        return this.gsSession;
    }














    /** 接收到client的连接 */
    public OnClientConnected(socket: SocketIO.Socket, data: any) {
        let clLogic: LoginUser = new LoginUser();
        clLogic.Init(socket, this.clSession);
        this.clSession.AddConnector(socket, clLogic);

        // 发送给客户端gameserver信息
        let msg: MsgLC.L2CServerInfo = MsgLC.L2CServerInfo.create();
        for (let i = 0; i < 3; i++) {
            let msg2: MsgLC.ServerInfo = MsgLC.ServerInfo.create();
            // msg.nID = this.gameServers[0].nID;
            // msg.sName = this.gameServers[0].sName;
            // msg.sIp = this.gameServers[0].sIP;
            // msg.nPort = this.gameServers[0].nPort;
            // msg.eState = MsgBase.EServerState.EOPEN;
            msg2.nID = (i + 1) * 1000;
            msg2.sName = i.toString();
            msg2.sIp = i.toString() + ".1.1.1";
            msg2.nPort = (i + 1) * 1000 + 1;
            msg2.eState = i;
            msg.serverInfos.push(msg2);
        }
        clLogic.SendMsg(msg);

        // let dccc = MsgLC.L2CServerInfo.decode(buffer);
        // let  b = 3;
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
