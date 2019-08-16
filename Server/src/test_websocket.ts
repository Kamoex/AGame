import * as http from "http";
import { server } from "websocket";
import { test_ptb } from "./test_ptb";


let ptb: test_ptb = new test_ptb();

const hostname = '127.0.0.1';
const port = 8001;
let client: number = 0;

let http_Server: http.Server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
http_Server.listen(port, function () {
    console.log((new Date()) + ' Server is listening on port ' + port);
});
let wsServer: server = new server({ httpServer: http_Server, autoAcceptConnections: false });

// 检测客户端连接源
function originIsAllowed(origin: any) {
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept(undefined, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            if(message.utf8Data == undefined)
                return;
            connection.sendUTF(message.utf8Data.toString());
        }
        else if (message.type === 'binary') {
            if(message.binaryData == undefined)
                return;
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');

            let clientData = ptb.msg_proto2.decode(message.binaryData);
            console.log(`decoded = ${JSON.stringify(clientData)}`);

            // 发送
            let send_msg = ptb.msg_proto1.encode(ptb.message).finish();
            connection.sendBytes(Buffer.from(send_msg));
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});