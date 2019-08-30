import { MariaDBMgr } from "../db/MariaDBMgr";
import { LoginServerCfg } from "../LoginServerCfg";
import { ServerSession } from "./ServerSession";
import { LCMsgHandler } from "../msg_handler/LCMsgHandler";
import { LGSMsgHandler } from "../msg_handler/LGSMsgHandler";
import { LoginLog } from "../log/LogMgr";


export class LoginServer{

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    // client连接信息处理
    private clSession: ServerSession = null;
    // client消息处理
    private clMsgHandler: LCMsgHandler = LCMsgHandler.GetInstance();
    // gameserver连接信息处理
    private gsSession: ServerSession = null;
    // gameserver消息处理
    private gsMsgHandler: LGSMsgHandler = LGSMsgHandler.GetInstance();

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
        // 初始化session
        this.clSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, this.clMsgHandler, LoginLog);
        this.gsSession = new ServerSession(LoginServerCfg.server_id,LoginServerCfg.server_name, this.gsMsgHandler, LoginLog);
    }
    
    // 启动服务器
    public StartServer() {
        this.clSession.CreateSession(LoginServerCfg.client_port);
        this.gsSession.CreateSession(LoginServerCfg.gs_port);
    }
}

async function StartLoginServer() {
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

StartLoginServer();
