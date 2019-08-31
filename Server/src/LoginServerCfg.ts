import * as mariadb from "mariadb";
import { MARIADB_CONNECTIONS } from "./common/CommonDefine";
var md5 = require('md5');

export class LoginServerCfg {
    private constructor(){}
    /** 服务器配置 */
    public static readonly server_id = 1001;                    // login serverID
    public static readonly server_name = "测试一区";             // login server_name
    public static readonly gs_port = 8002;                      // login对game_srv开放的端口
    public static readonly client_port = 8001;                  // login对client开放的端口
    public static readonly token = 'tempToken';                 // login服务器验证

    /** MariaDB配置 */
    public static readonly mariadb_cfg: mariadb.PoolConfig = {
        host : "127.0.0.1",           
        port : 3306,                  
        user : "root",                
        password : "123456",
        database : "login",                                     // 连接DB的库
        connectionLimit: MARIADB_CONNECTIONS                    // 连接数量
    }             

    /** LOG配置 */
    public static readonly log_name = "LoginSrvLog";            // Log名字
    public static readonly log_size = 40;                       // log文件大小(mb)
}
