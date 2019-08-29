import { MariaDBMgr } from "../db/MariaDBMgr";
import { LoginServerCfg } from "../LoginServerCfg";
import { ServerSession } from "./ServerSession";
import { LCMsgHandler } from "../msg_handler/LCMsgHandler";


export class LoginServer{

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    // 负责处理client连接信息
    private clSession: ServerSession = new ServerSession();
    private clMsgHandler: LCMsgHandler = LCMsgHandler.GetInstance();
    // 负责处理gameserver连接信息
    private gsSession: ServerSession = new ServerSession();
    private gsMsgHandler: LCMsgHandler = null;

    private static ins: LoginServer = null;
    private constructor() {}
    public static GetInstance(): LoginServer {
        if (!LoginServer.ins)
            LoginServer.ins = new LoginServer();
        return LoginServer.ins;
    }

    // 初始化服务器
    public async Init() {
        // DB初始化
        await this.mariaDB.Init(LoginServerCfg.mariadb_cfg);
    }
    
    // 启动服务器
    public StartServer() {
        this.clSession.CreateSession(LoginServerCfg.server_name, this.clMsgHandler, LoginServerCfg.login2client_port);
        // this.gsSession.CreateSession(LoginServerCfg.server_name, this.gsMsgHandler, LoginServerCfg.login2game_port);
    }
}

async function StartLoginServer() {
    try {
        // 读取配置表

        // 注册消息
        LCMsgHandler.GetInstance().MessageRegist();

        await LoginServer.GetInstance().Init();
        await LoginServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
        debugger;
    }
}

StartLoginServer();
