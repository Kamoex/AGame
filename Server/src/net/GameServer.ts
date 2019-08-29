import { MariaDBMgr } from "../db/MariaDBMgr";
import { GameServerCfg } from "../GameServerCfg";
import { MongoDBMgr } from "../db/MongoDBMgr";


export class GameServer {

    public mariaDB: MariaDBMgr = new MariaDBMgr();
    public mongoDB: MongoDBMgr = new MongoDBMgr();

    private loginSession: SocketIOClient.Socket = null;

    private static ins: GameServer = null;
    private constructor() {}

    public static GetInstance(): GameServer {
        if (!GameServer.ins)
            GameServer.ins = new GameServer();
        return GameServer.ins;
    }

    // 初始化服务器
    public async Init() {
        await this.mariaDB.Init(GameServerCfg.mariadb_cfg);
        await this.mongoDB.Init(GameServerCfg.mongo_user, GameServerCfg.mongo_password, GameServerCfg.mongo_host, GameServerCfg.mongo_port, GameServerCfg.mongo_databass);
    }

    // 启动服务器
    // public StartServer(port: number) {
    //     this.CreateServerIO(port);
        // this.infos = this.serverIO.on(SOCKET_IO_CONNECTION, this.OnConnected);
    // }

}

async function StartGameServer() {
    try {
        // 读取配置表

        // 注册消息
        // MessageHandler.GetInstance().MessageRegist();

        // await GameServer.GetInstance().Init();
        // GameServer.GetInstance().StartServer(8001);

    } catch (error) {
        console.error(error);
    }
}

StartGameServer();
