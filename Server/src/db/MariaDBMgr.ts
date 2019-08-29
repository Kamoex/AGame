import * as mariadb from "mariadb";
import { EDBOP } from "../common/CommonDefine";
import { SQLProcedure, SQL_FUN_DROP_ADD_COLUMN, SQL_FUN_CREATE_ADD_COLUMN } from "./SQLProcedure";
import { SQL_TBL_ACCOUNT } from "./SQLTable";
import { LogMgr, MariaLog } from "../log/LogMgr";

export class MariaDBMgr {
    private cfg: mariadb.PoolConfig = null;
    private pool: mariadb.Pool;
    // 备用连接 防止连接池满 等待超时后 就用备用连接
    private conStandby: mariadb.Connection;

    public async Init(cfg: mariadb.PoolConfig) {
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

        MariaLog.Info('MariaDB init success!!!', true);
    }

    public Close() {
        if(this.pool) {
            this.pool.end();
            this.conStandby.end();
            this.conStandby.destroy();
        }
        MariaLog.Info('MariaDB closed!!!', true);
    }

    // 创建存储过程
    private async CreateProcedures() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        try {
            // 创建ADD_COLUMN
            await conPool.query(SQL_FUN_DROP_ADD_COLUMN);
            await conPool.query(SQL_FUN_CREATE_ADD_COLUMN);
            MariaLog.Info('MariaDB createProcedures success!!!', true);
        } catch (error) {
            MariaLog.Error('MariaDB createProcedures failed!!!', error);
            this.Close();
        }
        conPool.release();
    }

    // 创建表
    private async CreateTables() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        try {
            // account表
            await conPool.query(SQL_TBL_ACCOUNT);
            MariaLog.Info('MariaDB createTables success!!!', true);
        } catch (error) {
            MariaLog.Error('MariaDB createTables failed!!!', error);
            this.Close();
        }

        conPool.release();
    }

    // 添加字段
    private async AddFields() {
        let conPool: mariadb.PoolConnection = await this.pool.getConnection();
        try {
            let sql: string = '';
            sql = SQLProcedure.ADD_COLUMN('account', 'test_field', 'varchar(255)', 'not null default "1970-1-1"');
            await conPool.query(sql);

            MariaLog.Info('MariaDB addFields success!!!', true);
        } catch (error) {
            MariaLog.Error('MariaDB addFields failed!!!', error);
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
            MariaLog.Error('MariaDB DBOP failed!!! op: ' + op, true);
        }
    }

    public async Find(sql: string, cb: (res) => void) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res);
    }

    public async Update(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res.affectedRows);
    }

    public async Delete(sql: string, cb: any) {
        this.CheckIdleConnections();
        let conn: mariadb.PoolConnection = await this.pool.getConnection();
        let res = await conn.query(sql);
        conn.release();
        cb(res.affectedRows);
    }

    // 检查空闲连接
    private CheckIdleConnections() {
        if(this.pool.idleConnections() <= 0) {
            MariaLog.Warn('MariaDB connections busy!!! taskQueues: ' + this.pool.taskQueueSize + '|activedCons: ' + this.pool.totalConnections + '|totalCons: ' + this.pool.activeConnections + '|idleCons: ' + this.pool.idleConnections, true);
        }
    }
}
