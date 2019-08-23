import * as http from "http";
var io = require("socket.io");

/**
 * 负责与客户端连接，处理socket，发包，收报
 */
export class ServerBase {
  
    // 当前server信息
    protected serverIO: SocketIO.Server;
    // 存储所有连接过来的socket 还有其他的信息(基本上什么都有)
    protected infos: SocketIO.Namespace;

    constructor(){}

    public CreateServerIO(nPort: number) {
        // 创建httpServer
        let http_Server: http.Server = http.createServer(function (request, response) {
          console.log((new Date()) + ' Received request for ' + request.url);
          response.writeHead(404);
          response.end();
        });
    
        // 监听
        http_Server.listen(nPort, function () {
          console.log((new Date()) + ' Server is listening on ' + nPort);
        });
    
        // 绑定server
        this.serverIO = new io((http_Server), {
          pingTimeout: 99999999,
          pingInterval: 99999999
        });
    
      }
}
