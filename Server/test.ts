import * as mongo from "mongodb"

var url = 'mongodb://localhost:27017/test';

try {
    mongo.MongoClient.connect(url, (error, client)=>{
        console.log('error:' + error);
        if(client.isConnected) {
            client.db('test').collection('test_doc').insert({'_id' : 1, 'name' : '张三', 'opt' : 'ceshi'}, (res)=>
            {
                console.log('res: ' + res);
            });
        }
    });
} catch (error) {
    let a = 1;
}


// co(function*() {
//   const db = yield MongoClient.connect(url);
//   console.log("Connected successfully to server");
  
//   yield insertDocuments(db, null);
//   yield findDocuments(db, null);
//   yield indexCollection(db, null);
//   yield aggregateDocuments(db, null);

//   db.close();
// }).catch(err => console.log(err));