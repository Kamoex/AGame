// import * as mongo from "mongodb"

// var url = 'mongodb://localhost:27017/test';

// try {
//     mongo.MongoClient.connect(url, (error, client)=>{
//         console.log('error:' + error);
//         if(client.isConnected) {
//             client.db('test').collection('test_doc').insert({'_id' : 1, 'name' : '张三', 'opt' : 'ceshi'}, (res)=>
//             {
//                 console.log('res: ' + res);
//             });
//         }
//     });
// } catch (error) {
//     let a = 1;
// }

import * as mariadb from "mariadb";

let pool: mariadb.Pool = mariadb.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test',
    connectionLimit: 0
});

function GetRes() {
    let res = testMaria();
    console.log(1111);
    console.log(res);
}

class people {
    protected age = 3;
    public son = "hahaha";
    public obj_ori = {
        a:1,
        b:2
    }
}

class role extends people {
    private id: number;
    private name: string;
    private obj = {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'test',
        connectionLimit: 0
    }
    private ary: Array<any> = new Array();

    public init() {

        this.ary.push(1)
        this.ary.push(this);
        this.ary.push("asdfasdf");
    }
}

var r = new role();
r.init();

let tttt = JSON.stringify(r);

async function testMaria() {
    let conn: mariadb.PoolConnection;
    try {
        conn = await pool.getConnection();
        let bb = Buffer.alloc(32);
        let rows = await conn.query('insert into person values(11,2,1,?)', [tttt]);
        let rows2 = await conn.query('select * from person where id = ?', [1]);
        let bbbb = rows2[0].name as {a:1,b:2};
        return rows2;
    } catch (error) {
        console.log(error);
    }
}

GetRes();