import * as mariadb from "mariadb";
import * as mongodb from 'mongodb';
import { MARIADB_CONNECTIONS } from "./common/CommonDefine";

export class GameServerCfg {
    private constructor() { }
    // 服务器配置
    public static readonly server_id = 1010;                   // game服务器ID
    public static readonly server_name = "游戏一服";            // game服务器名字
    public static readonly ip = "127.0.0.1";                   // gamesrvIP
    public static readonly port = 8010;                        // gamesrv对外的端口
    public static readonly loginsrv_ip = "127.0.0.1";          // 连接login服的IP
    public static readonly loginsrv_port = 8002;               // 连接login服的端口
    public static readonly loginsrv_token = "tempToken";       // 连接login服的认证
    public static readonly open_time = "2019:8:24:9:00";       // 开服时间

    // DB配置
    public static readonly mariadb_cfg: mariadb.PoolConfig = {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "123456",
        database: "game",                                       // 连接DB的库
        connectionLimit: MARIADB_CONNECTIONS                    // 连接数量
    }

    // MongoDB配置
    public static readonly mongo_host = "127.0.0.1";
    public static readonly mongo_port = 27017;
    public static readonly mongo_user = "root";
    public static readonly mongo_password = "123456";
    public static readonly mongo_databass = "gamelog";

    // LOG配置
    public static readonly log_name = "GameSrvLog";            // Log名字
    public static readonly log_size = 100;                      // log文件大小(mb)
}
