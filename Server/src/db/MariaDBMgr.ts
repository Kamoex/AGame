import * as mariadb from "mariadb";
import { MARIADB_CONNECTIONS } from "../common/CommonDefine";

export class MariaDBMgr {
    private host: string;
    private port: number;
    private user: string;
    private password: string;
    private database: string;

    private pool: mariadb.Pool;

    public Init(cfg: any) {
        this.host = cfg.host;
        this.port = cfg.port;
        this.user = cfg.user;
        this.password = cfg.password;
        this.database = cfg.database;

        // 连接DB
        this.pool = mariadb.createPool({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database,
            connectionLimit: MARIADB_CONNECTIONS,   // 连接数量
        });

        if(this.pool.activeConnections() <= 0) {
            throw new Error("MariaDBMgr init fail!!!")
        }
    }

    public Close() {

    }

    async Find(sql: string, cb: (res) => void) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        cb(res);
    }

    async Update(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        cb(res.affectedRows);
    }

    async Delete(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        cb(res.affectedRows);
    }

    // 检查空闲连接
    private CheckIdleConnections() {
        if(this.pool.idleConnections() <= 0) {
            console.log("MariaDBMgr connections busy!!!")
        }
    }
}
