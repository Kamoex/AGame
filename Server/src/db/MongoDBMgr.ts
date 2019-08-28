import * as mongodb from 'mongodb';
import { GameServerCfg } from '../GameServerCfg';
import { DB_LOG_LOGIN } from './MongoLogCollections';

export class MongoDBMgr {

    private mongo: mongodb.MongoClient = null;
    private db: mongodb.Db = null;

    async Init() {
        try {
            // 建立连接
            let mongourl: string = 'mongodb://' + GameServerCfg.mongo_user + ':' + GameServerCfg.mongo_password + '@';
            mongourl = mongourl + GameServerCfg.mongo_host + ':' + GameServerCfg.mongo_port + '/admin';

            this.mongo = await mongodb.MongoClient.connect(mongourl, {
                authSource: GameServerCfg.mongo_databass,
                useNewUrlParser: true,
                autoReconnect: true,    // 自动重连
                // auth: {
                //     user: GameServerCfg.mongo_user,
                //     password: GameServerCfg.mongo_password,
                // }
            });

            // 绑定库
            this.db = this.mongo.db(GameServerCfg.mongo_databass);

            // 创建表
            let todayDate: string = new Date().toLocaleDateString();
            let tomorrowDate: string = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();

            await this.CreateLogCollections(DB_LOG_LOGIN + todayDate);
            // 多创建一天 是因为异步的原因 不想回调
            await this.CreateLogCollections(DB_LOG_LOGIN + tomorrowDate);

            console.log("mongodb init success")

        } catch (error) {
            console.error(error);
        }
    }

    // 创建LOG表
    async CreateLogCollections(colName: string) {
        await this.db.createCollection(colName, {});
    }

    // 删除LOG表
    async DropLogCollections(colName: string) {
        let res: boolean = await this.db.dropCollection(colName);
        console.log("drop log " + colName + " op: " + res);
    }

    // 插入LOG
    public LogInsert(colName: string, obj: any, cb: (err, res) => void) {
        let col: mongodb.Collection = this.db.collection(colName);
        col.insertOne(obj, cb);
    }
}