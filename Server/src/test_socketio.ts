import * as http from "http";
import {TestPackage, TestPackage2} from '../MessageBuild/message_server'

let a = TestPackage.TestMessage.create();

import { test_ptb } from "./test_ptb";


let http_Server: http.Server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
http_Server.listen(8001, function () {
  console.log((new Date()) + ' Server is listening on 8001 ' + 8001);
});

var io = require("socket.io")(http_Server);

io.on('connect', onConnect);
function onConnect(socket: any) {
  let ptb: test_ptb = new test_ptb();
  console.log('有机器连接服务器')

  socket.on('message', function (data: any) {
    let proto1 = TestPackage.TestMessage.encode(ptb.message).finish();
    console.log("data:", data);
    try {
      let ui8 = new Uint8Array(data);
      let buf = Buffer.from(ui8);
      let recvMsg = TestPackage.TestMessage.decode(data);
      let recvMsg2 = TestPackage.TestMessage.decode(buf);
      console.log("data_decode: ", recvMsg);
    } catch (error) {
      console.log(error);
    }

    ptb.message.sName = "Mom";
    ptb.message.nId = 21000000009;
    ptb.message.fWeight = 1889.5;
    ptb.message.bSex = true;

    console.log("send 001:", ptb.message);
    let proto2 = ptb.msg_proto1.encode(ptb.message).finish();

    socket.send(proto2);

    // socket.broadcast.send(netProto.Heartbeat.encode(heartbeat).finish())
  })

  socket.on('disconnect', function () {
    console.log('客户端断开连接' + socket.name)
  })
  socket.on('error', function () {
    console.log('客户端发生错误' + socket.name)
  })
}
