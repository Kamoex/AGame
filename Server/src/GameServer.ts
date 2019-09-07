import { MariaDBMgr } from "./db/MariaDBMgr";
import { GameServerCfg } from "./GameServerCfg";
import { MongoDBMgr } from "./db/MongoDBMgr";
import { GameLog } from "./log/LogMgr";
import { ServerSession } from "./net/ServerSession";
import { ClientSession } from "./net/ClientSession";
import { GSCMsgHandler } from "./msg_handler/GSCMsgHandler";
import { LGSMsgHandler } from "./msg_handler/LGSMsgHandler";
import { SOCKET_IO_CONNECT, SOCKET_IO_DISCONNECT } from "./common/CommonDefine";
import { MsgBase, MsgLGS } from "../message/message_server";


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
    /** client消息处理 */
    private clMsgHandler: GSCMsgHandler = GSCMsgHandler.GetInstance();
    /** login连接信息处理 */
    private loginSession: ClientSession = null;
    /** 与login服务器连接状态 */
    private loginConnected: boolean = false;

    private static ins: GameServer = null;
    private constructor() { }
    public static GetInstance(): GameServer {
        if (!GameServer.ins)
            GameServer.ins = new GameServer();
        return GameServer.ins;
    }

    /** 初始化服务器 */
    public async Init() {
        // 初始化DB
        await this.mariaDB.Init(GameServerCfg.mariadb_cfg);
        await this.mongoDB.Init(GameServerCfg.mongo_user, GameServerCfg.mongo_password, GameServerCfg.mongo_host, GameServerCfg.mongo_port, GameServerCfg.mongo_databass);
        // 初始化连接loginsession
        this.loginSession = new ClientSession(GameServerCfg.server_id, GameServerCfg.server_name, LGSMsgHandler.GetInstance(), GameLog)
        this.loginSession.SetEventFun(SOCKET_IO_CONNECT, this.OnConnectLoginSrv.bind(this));
        this.loginSession.SetEventFun(SOCKET_IO_DISCONNECT, this.OnDisConnectLoginSrv.bind(this));
        // 初始化gameserver
        this.clSession = new ServerSession(GameServerCfg.server_id, GameServerCfg.server_name, this.clMsgHandler, GameLog);
    }

    /** 启动服务器 */
    public StartServer() {
        // 连接login
        this.loginSession.CreateSession(GameServerCfg.loginsrv_ip, GameServerCfg.loginsrv_port, GameServerCfg.loginsrv_token);
        // 启动gameserver
        this.clSession.CreateSession(GameServerCfg.port);
    }

    /** 与login成功连接 */
    private OnConnectLoginSrv() {
        try {
            GameLog.Assert(' gameserver connect login success!!!');
            this.loginConnected = true;
            // 向login注册gameserver
            this.RegistGameServerToLogin();

        } catch (error) {
            GameLog.Error('Gameserver OnConnectLoginSrv error!!!', error);
        }
    }

    /** 与login断开连接 */
    private OnDisConnectLoginSrv() {
        try {
            GameLog.Warn(' gameserver disconnect login!!!');
            this.loginConnected = false;
        } catch (error) {
            GameLog.Error('Gameserver OnDisConnectLoginSrv error!!!', error);
        }
    }

    /** 向loginserver发送消息 */
    private Send2Login(data: any, firstMsg: boolean = false) {
        let msgName: string;
        try {
            // 编码消息体
            let msgHead: MsgBase.MessageHead = MsgBase.MessageHead.create();
            msgName = data.constructor.name;
            let msgBody: any = MsgLGS[msgName];
            let buffer: Uint8Array = msgBody.encode(data).finish();
            // 填充消息头
            msgHead.nMsgID = LGSMsgHandler.GetInstance().GetMsgKey(msgName);
            msgHead.nMsgLength = buffer.byteLength;
            msgHead.data = buffer;
            // 编码消息头
            let msg: Uint8Array = MsgBase.MessageHead.encode(msgHead).finish();
            if(firstMsg) {
                this.loginSession.SendFirstMsg(msg);
            }
            else {
                this.loginSession.Send(msg)
            }
        } catch (error) {
            GameLog.Error('Send2Login msgName: ' + msgName, error);            
        }
    }


    /*--------------------------------------------------------------------------------------------------------------------------------*/
    /*                                                                                                                                */
    /*                                                         与login交互逻辑代码                                                     */
    /*                                                                                                                                */
    /*--------------------------------------------------------------------------------------------------------------------------------*/

    /** 向login注册gameserver信息 */
    public RegistGameServerToLogin() {
        let msg: MsgLGS.GS2LConnectAuth = MsgLGS.GS2LConnectAuth.create();
        msg.ip = GameServerCfg.ip;
        msg.port = GameServerCfg.port;
        msg.serverId = GameServerCfg.server_id;
        msg.serverName = GameServerCfg.server_name;
        msg.token = "";
        this.Send2Login(msg, true);
    }
}

let paramAry2 = process.argv.slice(2);

async function StartGameServer(param: string) {
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

StartGameServer(paramAry2[0]);
