import { SOCKET_IO_CONNECTION, SOCKET_IO_MESSAGE, SOCKET_IO_DISCONNECTION, SOCKET_IO_ERROR, SOCKET_WS_REQUEST } from "../common/CommonDefine";
import { MsgBase } from "../../message/message_server";
import { LoginLog } from "../log/LogMgr";
import { IMsgHandler } from "../msg_handler/MsgHandler";
import * as http from "http";
var io = require("socket.io");


export class ServerSession {
    private masterName: string;
    // 消息处理器
    private msgHandler: IMsgHandler;
    // serverio.server信息
    private serverIO: SocketIO.Server;
    // sokcet管理
    private infos: SocketIO.Namespace;
    
    public CreateSession(masterName: string, msgHandler: IMsgHandler, nPort: number) {
        try {
            this.masterName = masterName;
            this.msgHandler = msgHandler;
            let http_server: http.Server = http.createServer(function (request, response) {
                console.log((new Date().toLocaleString()) + '| ' + masterName + ' socket.io received request for ' + request.url);
                response.writeHead(404);
                response.end();
            });
    
            http_server.listen(nPort, function () {
                console.log((new Date().toLocaleString()) + '| ' + masterName + ' socket.io server is listening on ' + nPort);
            });
    
            this.serverIO = new io(http_server,{
                pingTimeout: 999999999,
                pingInterval: 999999999
            });
            // 连接处理
            this.infos = this.serverIO.on(SOCKET_IO_CONNECTION, this.OnConnected.bind(this));
        } catch (error) {
            LoginLog.Error('ServerSession createSession error!!! masterName: ' + masterName, error);
        }
    }

    // 连接成功
    private OnConnected(socket: SocketIO.Socket) {
        try {
            console.log('a client connected!!! socket_id: ' + socket.id + ' sockets: ' + this.infos.sockets);
            // 消息处理
            socket.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this,socket));
            // 断线处理
            socket.on(SOCKET_IO_DISCONNECTION, this.OnDisconnect.bind(this,socket));
            // 错误处理
            socket.on(SOCKET_IO_ERROR, this.OnError.bind(this,socket));
        } catch (error) {
            LoginLog.Error('ServerSession onConnected error!!! master_name: ' + this.masterName + ' socket: ' + socket, error);
        }
    }

    // 接收消息
    private OnRecv(socket: SocketIO.Socket, recvData: any): void {
        let msgID: number = 0;
        try {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            msgID = recvMsg.nMsgID;
            this.msgHandler.MessageHandle(recvMsg.nMsgID, recvMsg.data);
            console.log("data_decode: ", recvData);
            this.Send(socket, recvData);
        } catch (error) {
            socket.disconnect(true);
            LoginLog.Error('OnRecv Error!!! master_name: ' + this.masterName + ' msgID: ' + msgID, error);
        }
    }

    // 接收消息
    private Send(socket: SocketIO.Socket, data: any): void {
        try {
            socket.send(data);
            console.log("send data: ", data);
        } catch (error) {
            LoginLog.Error('Send error!!! master_name: ' + this.masterName + 'data: ' + data, error);
        }
    }

    // 断开连接与客户端
    private OnDisconnect(socket: SocketIO.Socket, info: any): void {
        try {
            socket.disconnect(true)
            console.log("client disconnect: ", info);
        } catch (error) {
            LoginLog.Error('OnDisconnect Error!!! master_name: ' + this.masterName + ' info: ' + info, error);
        }
    }

    // 错误
    private OnError(socket: SocketIO.Socket, e: any): void {
        try {
            socket.disconnect(true);
            LoginLog.Error('OnRecv Error!!! error: ' + e, null);
        } catch (error) {
            LoginLog.Error('OnError Error!!! master_name: ' + this.masterName + ' error: ' + e, error);
        }
    }

}
