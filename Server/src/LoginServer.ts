import { MariaDBMgr } from "./db/MariaDBMgr";
import { LoginServerCfg } from "./LoginServerCfg";
import { ServerSession } from "./net/ServerSession";
import { LoginLog } from "./log/LogMgr";
import { SOCKET_IO_MESSAGE } from "./common/CommonDefine";
import { LoginServerMsgHandler } from "./msg_handler/LoginServerMsgHandler";
import { LoginGSLogic } from "./logic/Login/LoginGSLogic";
import { LoginUser } from "./logic/Login/LoginUser";


export class LoginServer {

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    /** client连接信息处理 */
    private clSession: ServerSession = null;
    /** gameserver连接信息处理 */
    private gsSession: ServerSession = null;
    /** 所有连接到login的gameserver信息 */
    private gameServers: Array<LoginGSLogic> = [];

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
        gsLogic.SetSocket(socket);
        this.gsSession.SetEventFun(SOCKET_IO_MESSAGE, gsLogic.HandleMsg.bind(gsLogic))

        // 通知GameServer连接成功
        gsLogic.InformGSConnectSuccess();
        
    }

    /** 添加gameserver */
    public AddGSLogic(gsLogic: LoginGSLogic) {
        for (let i = 0; i < this.gameServers.length; i++) {
            let gs = this.gameServers[i];
            if(gs.nID == gsLogic.nID) {
                gs.UpdateInfo(gsLogic);
                return;
            }
        }
        this.gameServers.push(gsLogic);
    }
    
    /** 接收到client的连接 */
    public OnClientConnected(socket: SocketIO.Socket, data: any) {
        let clLogic: LoginUser = new LoginUser();
        clLogic.SetSocket(socket);
        this.clSession.SetEventFun(SOCKET_IO_MESSAGE, clLogic.HandleMsg.bind(clLogic));

        // 发送给客户端gameserver信息
        // let msg: MsgLC.L2CServerInfo = MsgLC.L2CServerInfo.create();
        // let serverInfo: MsgLC.ServerInfo = MsgLC.ServerInfo.create();
        // msg.serverInfos = MsgLC.ServerInfo.create();
        // msg.serverInfos.nID = this.gameServers[0].id;
        // msg.serverInfos.sName = this.gameServers[0].name;
        // msg.serverInfos.sIp = this.gameServers[0].ip;
        // msg.serverInfos.nPort = this.gameServers[0].port;
        // msg.serverInfos.eState = MsgLC.ServerInfo.EServerState.EOPEN;
        // let buffer = MsgLC.L2CServerInfo.encode(msg).finish();
        // this.clSession.Send(socket, msg);

        // let dccc = MsgLC.L2CServerInfo.decode(buffer);
        // let  b = 3;
    }

    public GetGSSession() : ServerSession{
        return this.gsSession;
    }
    
    public GetCLSession() : ServerSession{
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
