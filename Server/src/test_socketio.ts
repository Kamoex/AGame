import * as http from "http";
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
    let proto1 = ptb.msg_proto1.encode(ptb.message).finish();
    console.log("data:", data);
    try {
      let recvMsg = ptb.msg_proto2.decode(data);
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
