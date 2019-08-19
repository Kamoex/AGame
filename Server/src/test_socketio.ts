import * as http from "http";
import * as fs from "fs";
import * as s from "socket.io"

let http_Server: http.Server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
http_Server.listen(8001, function () {
    console.log((new Date()) + ' Server is listening on 8001 ' + 8001);
});

var io = require('socket.io')(http_Server);

io.on('connection', function (socket: any) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data: any) {
    console.log(data);
  });
});