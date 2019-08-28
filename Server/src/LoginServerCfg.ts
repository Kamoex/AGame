import * as mariadb from "mariadb";
import { MARIADB_CONNECTIONS } from "./common/CommonDefine";

export class LoginServerCfg {
    private constructor(){}
    // 服务器配置
    public static readonly server_id = 1001;                    // login serverID
    public static readonly server_name = "测试一区";             // login server_name
    public static readonly gamesrv_ip = "127.0.0.1";            // login连接game服的IP
    public static readonly gamesrv_port = 8002;                 // game服端口
    public static readonly open_time = "2019:8:24:9:00";        // 开服时间

    // MariaDB配置
    public static readonly mariadb_cfg: mariadb.PoolConfig = {
        host : "127.0.0.1",           
        port : 3306,                  
        user : "root",                
        password : "123456",
        database : "login",                                     // 连接DB的库
        connectionLimit: MARIADB_CONNECTIONS                    // 连接数量
    }             

    // LOG配置
    public static readonly log_name = "LoginSrvLog";            // Log名字
    public static readonly log_size = 40;                       // log文件大小(mb)
}
