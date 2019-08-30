import { MariaDBMgr } from "../db/MariaDBMgr";
import { GameServerCfg } from "../GameServerCfg";
import { MongoDBMgr } from "../db/MongoDBMgr";
import { ClientSession } from "./ClientSession";
import { GameLog } from "../log/LogMgr";
import { ServerSession } from "./ServerSession";
import { GSCMsgHandler } from "../msg_handler/GSCMsgHandler";
import { LGSMsgHandler } from "../msg_handler/LGSMsgHandler";
import { MsgLGS } from "../../message/message_server";


export class GameServer {

    // DB管理器
    public mariaDB: MariaDBMgr = new MariaDBMgr();
    public mongoDB: MongoDBMgr = new MongoDBMgr();
    // client连接信息处理
    private clSession: ServerSession = null;
    // client消息处理
    private clMsgHandler: GSCMsgHandler = GSCMsgHandler.GetInstance();
    // login连接信息处理
    private loginSession: ClientSession = null;

    private static ins: GameServer = null;
    private constructor() {}
    public static GetInstance(): GameServer {
        if (!GameServer.ins)
            GameServer.ins = new GameServer();
        return GameServer.ins;
    }

    // 初始化服务器
    public async Init() {
        // 初始化DB
        await this.mariaDB.Init(GameServerCfg.mariadb_cfg);
        await this.mongoDB.Init(GameServerCfg.mongo_user, GameServerCfg.mongo_password, GameServerCfg.mongo_host, GameServerCfg.mongo_port, GameServerCfg.mongo_databass);
        // 初始化session
        this.loginSession = new ClientSession(GameServerCfg.server_id, GameServerCfg.server_name, GameLog)
        this.clSession = new ServerSession(GameServerCfg.server_id, GameServerCfg.server_name, this.clMsgHandler, GameLog);
    }

    // 启动服务器
    public StartServer() {
        this.loginSession.CreateSession(GameServerCfg.loginsrv_ip, GameServerCfg.loginsrv_port, GameServerCfg.loginsrv_token, this.OnConnectLoginSrv.bind(this));
        this.clSession.CreateSession(GameServerCfg.port);
    }
    
    public OnConnectLoginSrv() {
        try {
            GameLog.Assert(' gameserver connect login success!!!');
            let msg: MsgLGS.GS2LConnectAuth = MsgLGS.GS2LConnectAuth.create();
            this.ShowMsgName(msg);
            msg.ip = GameServerCfg.ip;
            msg.serverId = GameServerCfg.server_id;
            msg.serverName = GameServerCfg.server_name;
            this.loginSession.Send(MsgLGS.GS2LConnectAuth.encode(msg).finish());
        } catch (error) {
            GameLog.Error('Gameserver OnConnectLoginSrv error!!!',error);      
        }
    }

    private ShowMsgName(msg: any) {
        let c = msg.constructor.name;
        let b = Reflect.getPrototypeOf(msg);
        // console.log(msg.name);
    }

}

async function StartGameServer() {
    try {
        // 读取配置表

        // 注册消息
        GSCMsgHandler.GetInstance().MessageRegist();
        LGSMsgHandler.GetInstance().MessageRegist();

        await GameServer.GetInstance().Init();
        GameServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
    }
}

StartGameServer();
