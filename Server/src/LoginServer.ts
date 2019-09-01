import { MariaDBMgr } from "./db/MariaDBMgr";
import { LoginServerCfg } from "./LoginServerCfg";
import { ServerSession } from "./net/ServerSession";
import { LCMsgHandler } from "./msg_handler/LCMsgHandler";
import { LGSMsgHandler } from "./msg_handler/LGSMsgHandler";
import { LoginLog } from "./log/LogMgr";
import { MsgLGS, MsgBase } from "./../message/message_server";
import { Login } from './logic/Login/LoginServerData'
import { SOCKET_IO_FIRST_MSG, EDBOP } from "./common/CommonDefine";


export class LoginServer {

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    /** client连接信息处理 */
    private clSession: ServerSession = null;
    /** client消息处理 */
    private clMsgHandler: LCMsgHandler = LCMsgHandler.GetInstance();
    /** gameserver连接信息处理 */
    private gsSession: ServerSession = null;
    /** gameserver消息处理 */
    private gsMsgHandler: LGSMsgHandler = LGSMsgHandler.GetInstance();
    /** 所有连接到login的gameserver信息 */
    private gameServers: Array<Login.GSInfo> = [];

    private static ins: LoginServer = null;
    private constructor() { }
    public static GetInstance(): LoginServer {
        if (!LoginServer.ins)
            LoginServer.ins = new LoginServer();
        return LoginServer.ins;
    }

    /** 初始化服务器 */
    public async Init() {
        // DB初始化
        await this.mariaDB.Init(LoginServerCfg.mariadb_cfg);
        // 初始化session
        this.clSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, this.clMsgHandler, LoginLog);
        this.gsSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, this.gsMsgHandler, LoginLog);
        this.gsSession.SetEventFun(SOCKET_IO_FIRST_MSG, this.OnGameServerConnected.bind(this))
    }

    /** 启动服务器 */
    public StartServer() {
        this.clSession.CreateSession(LoginServerCfg.client_port);
        this.gsSession.CreateSession(LoginServerCfg.gs_port);
    }

    /** 接收到gameserver的连接 */
    public OnGameServerConnected(socket: SocketIO.Socket, data: any) {
        let recvMsg: MsgBase.MessageHead = MsgBase.MessageHead.decode(data);
        let recvData: MsgLGS.GS2LConnectAuth = MsgLGS.GS2LConnectAuth.decode(recvMsg.data)

        let gsInfo: Login.GSInfo = new Login.GSInfo();
        gsInfo.sockID = socket.id;
        gsInfo.ip = socket.handshake.address;
        gsInfo.id = recvData.serverId;
        gsInfo.port = recvData.port;
        gsInfo.name = recvData.serverName;
        gsInfo.token = recvData.token;
        gsInfo.login_time = new Date().getTime();
        this.gameServers.push(gsInfo);

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

        // 注册消息
        LCMsgHandler.GetInstance().MessageRegist();
        LGSMsgHandler.GetInstance().MessageRegist();

        await LoginServer.GetInstance().Init();
        await LoginServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
        debugger;
    }
}

StartLoginServer(paramAry[0]);
