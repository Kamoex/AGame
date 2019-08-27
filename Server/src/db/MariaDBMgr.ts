import * as mariadb from "mariadb";
import { EDBOP } from "../common/CommonDefine";
import { SQLProcedure, SQL_FUN_DROP_ADD_COLUMN, SQL_FUN_CREATE_ADD_COLUMN } from "./SQLProcedure";
import { SQL_TBL_ACCOUNT } from "./SQLTable";

export class MariaDBMgr {
    private cfg: mariadb.PoolConfig = null;
    private pool: mariadb.Pool;
    // 备用连接 防止连接池满 等待超时后 就用备用连接
    private conStandby: mariadb.Connection;

    async Init(cfg: mariadb.PoolConfig) {
        this.cfg = cfg;

        // 连接DB
        this.pool = mariadb.createPool(cfg);

        // 初始化备用连接
        this.conStandby = await mariadb.createConnection({
            host: cfg.host,
            port: cfg.port,
            user: cfg.user,
            password: cfg.password,
            database: cfg.database
        });

        // 创建存储过程
        await this.CreateProcedures();
        // 创建表
        await this.CreateTables();
        // 创建字段
        await this.AddFields();
    }

    public Close() {
        if(this.pool)
            this.pool.end();
        console.log("close MariaDB");
    }

    // 创建存储过程
    async CreateProcedures() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        try {
            // 创建ADD_COLUMN
            let sql = SQL_FUN_DROP_ADD_COLUMN;
            await conPool.query(SQL_FUN_DROP_ADD_COLUMN);
            // sql = SQL_FUN_CREATE_ADD_COLUMN;
            await conPool.query(SQL_FUN_CREATE_ADD_COLUMN);
            console.log("CreateProcedures")
        } catch (error) {
            console.error(error);
            this.Close();
        }
        conPool.release();
    }

    // 创建表
    async CreateTables() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        try {
            // account表
            await conPool.query(SQL_TBL_ACCOUNT);
            console.log("CreateTables")
        } catch (error) {
            console.error(error);
            this.Close();
        }

        conPool.release();
    }

    // 添加字段
    async AddFields() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        let res;
        try {
            let sql: string = "";
            sql = SQLProcedure.ADD_COLUMN('account', 'test_field', 'varchar(255)', 'not null default "1970-1-1"');
            res = await conPool.query(sql);
            console.log("AddFields")
        } catch (error) {
            console.error(error);
            this.Close();
        }
        conPool.release();
    }

    public DBOP(op: EDBOP, sql: string, cb:(res)=>void) {
        try {
            switch (op) {
                case EDBOP.EDB_FIND:
                    this.Find(sql, cb);
                    break;
                case EDBOP.EDB_INSERT:
                case EDBOP.EDB_UPDATE:
                case EDBOP.EDB_REPLACE:
                    this.Update(sql, cb);
                    break;
                case EDBOP.EDB_DEL:
                    this.Delete(sql, cb);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("MariaDB OP ERROR!!! SQL: " + sql);
            console.error(error.stack);
        }
    }

    async Find(sql: string, cb: (res) => void) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res);
    }

    async Update(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res.affectedRows);
    }

    async Delete(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res.affectedRows);
    }

    // 检查空闲连接
    private CheckIdleConnections() {
        if(this.pool.idleConnections() <= 0) {
            console.log("MariaDBMgr connections busy!!!")
        }
    }
}
