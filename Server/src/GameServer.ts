import { MariaDBMgr } from "./db/MariaDBMgr";
import { GameServerCfg } from "./GameServerCfg";
import { MongoDBMgr } from "./db/MongoDBMgr";
import { GameLog } from "./log/LogMgr";
import { ServerSession } from "./net/ServerSession";
import { ClientSession } from "./net/ClientSession";
import { SOCKET_IO_DISCONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_CONNECT } from "./common/CommonDefine";
import { GameServerMsgHandler } from "./msg_handler/GameServerMsgHandler";
import { GameAssert } from "./utils/Utils";
import { GSUser } from "./logic/Game/GSUser";
import { GSLoginLogic } from "./logic/Game/GSLoginLogic";


/**
 * GameServer 
 * 1.负责处理与login的连接与交互
 * 2.负责处理与客户端的连接与交互
 */

export class GameServer {
    /** DB管理器 */
    public mariaDB: MariaDBMgr = new MariaDBMgr();
    public mongoDB: MongoDBMgr = new MongoDBMgr();
    /** client连接信息处理 */
    private clSession: ServerSession = null;
    /** login连接信息处理 */
    private loginSession: ClientSession = null;
    /** 与login服务器连接状态 */
    private loginLogic: GSLoginLogic = null;
    /** 连接的所有玩家 */
    private roles: Array<GSUser> = [];
    /** roleID对应roles中的index */
    private rolesDic: any = {};

    private static ins: GameServer = null;
    private constructor() { }
    public static GetInstance(): GameServer {
        if (!GameServer.ins)
            GameServer.ins = new GameServer();
        return GameServer.ins;
    }

    /** 初始化服务器 */
    public async Init() {
        // 消息注册
        GameServerMsgHandler.GetInstance().MessageRegist();
        // 初始化DB
        await this.mariaDB.Init(GameServerCfg.mariadb_cfg);
        await this.mongoDB.Init(GameServerCfg.mongo_user, GameServerCfg.mongo_password, GameServerCfg.mongo_host, GameServerCfg.mongo_port, GameServerCfg.mongo_databass);
        // 初始化连接loginsession
        this.loginSession = new ClientSession(GameServerCfg.server_id, GameServerCfg.server_name, GameLog)
        this.loginSession.SetEventFun(SOCKET_IO_CONNECT, this.OnConnectLogin.bind(this));
        // 初始化gameserver
        this.clSession = new ServerSession(GameServerCfg.server_id, GameServerCfg.server_name, GameLog, this.OnClientConnected.bind(this));
    }

    /** 启动服务器 */
    public StartServer() {
        // 连接login
        this.loginSession.CreateSession(GameServerCfg.loginsrv_ip, GameServerCfg.loginsrv_port, GameServerCfg.loginsrv_token);
        // 启动gameserver
        this.clSession.CreateSession(GameServerCfg.port);
    }
    
    /** 连接login成功 */
    public OnConnectLogin() {
        this.loginLogic = new GSLoginLogic(this.loginSession);
        this.loginSession.SetEventFun(SOCKET_IO_MESSAGE, this.loginLogic.HandleMsg.bind(this.loginLogic));
        this.loginSession.SetEventFun(SOCKET_IO_DISCONNECT, this.loginLogic.OnDisConnectLoginSrv.bind(this.loginLogic));
    }




    /** 客户端成功连接 */
    private OnClientConnected(socket: SocketIO.Socket) {
        let clLogic: GSUser = new GSUser();
        this.clSession.AddConnector(socket.id, clLogic);
        clLogic.Init(socket, this.clSession);
        clLogic.OnConnected();
    }

    public ClearRole(roleID: number) {
        if (GameAssert(this.rolesDic[roleID], "GameServer ClearRole role is null !!! roleID: " + roleID))
            return;
        let index: number = this.rolesDic[roleID];
        if (GameAssert(index > this.roles.length, "GameServer ClearRole error !!! roleID: " + roleID + " index: " + index))
            return;
        this.roles.splice(index, 1);
    }

    public GetRole(roleID: number): GSUser {
        if (GameAssert(this.rolesDic[roleID], "GameServer GetRole role is null !!! roleID: " + roleID))
            return;
        let index: number = this.rolesDic[roleID];
        if (GameAssert(index > this.roles.length, "GameServer GetRole error !!! roleID: " + roleID + " index: " + index))
            return;
        return this.roles[index];
    }

    public GetCLSession() : ServerSession{
        return this.clSession;
    }





    /*--------------------------------------------------------------------------------------------------------------------------------*/
    /*                                                                                                                                */
    /*                                                         与login交互逻辑代码                                                     */
    /*                                                                                                                                */
    /*--------------------------------------------------------------------------------------------------------------------------------*/

    
}

let paramAry2 = process.argv.slice(2);

async function StartGameServer(param: string) {
    try {
        // 读取配置表

        await GameServer.GetInstance().Init();
        GameServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
    }
}

StartGameServer(paramAry2[0]);
