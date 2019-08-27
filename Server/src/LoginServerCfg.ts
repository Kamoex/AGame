
export class LoginServerCfg {
    private constructor(){}
    // 服务器配置
    public static readonly server_id = 1001;                    // login serverID
    public static readonly gamesrv_ip = "127.0.0.1";            // login连接game服的IP
    public static readonly gamesrv_port = 8002;                 // game服端口
    public static readonly open_time = "2019:8:24:9:00";        // 开服时间

    // DB配置
    public static readonly mariadb_cfg: any = {
        host : "127.0.0.1",           
        port : 3306,                  
        user : "root",                
        password : "123456",           
        database : "test"                                // 连接DB的库
    }
                  
}