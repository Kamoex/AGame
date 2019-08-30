import * as io_client from 'socket.io-client';
import { SOCKET_IO_CONNECT, SOCKET_IO_DISCONNECT, SOCKET_IO_MESSAGE, SOCKET_IO_ERROR, SOCKET_IO_CONNECT_ERROR } from '../common/CommonDefine';
import { LogMgr } from '../log/LogMgr';
import { IMsgHandler } from '../msg_handler/MsgHandler';
import { MsgBase } from '../../message/message_server';

export class ClientSession {
    // 所属信息
    private masterID: number;
    private masterName: string;
    // 目的主机的URL
    private url: string;
    // 日志管理器
    private logger: LogMgr;
    // 消息处理器
    private msgHandler: IMsgHandler;
    private sock: SocketIOClient.Socket;

    public constructor(masterID: number, masterName: string, logger: LogMgr) {
        this.masterID = masterID;
        this.masterName = masterName;
        this.logger = logger;
    }

    public CreateSession(ip: string, port: number, token:string, fn: Function) {
        try {
            this.url = 'http://' + ip + ':' + port + '?token=' + token;
            this.sock = io_client.connect(this.url);
    
            this.sock.on(SOCKET_IO_CONNECT, fn);
            this.sock.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this));
            this.sock.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this));
            this.sock.on(SOCKET_IO_ERROR, this.OnError.bind(this));
            this.sock.on(SOCKET_IO_CONNECT_ERROR, this.OnConnectError.bind(this));
            this.sock.on('ping', ()=>{
                console.log(new Date().toLocaleString() + ': ping');
            })
            this.sock.on('pong', ()=>{
                console.log(new Date().toLocaleString() + ': pong');
            })
        } catch (error) {
            this.logger.Error('ClientSession CreateSession error!!! master: ' + this.masterID + '|' + this.masterName, error);
        }
    }

    public OnConnect() {
        this.logger.Assert(this.masterID + '|' + this.masterName + ' ClientSession connect ' + this.url + ' success');
    }

    public OnRecv(recvData: any) {
        let msgID: number = 0;
        try {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            msgID = recvMsg.nMsgID;
            this.msgHandler.MessageHandle(recvMsg.nMsgID, recvMsg.data);
            console.log("ClientSession data_decode: ", recvData);
            this.Send(recvData);
        } catch (error) {
            this.sock.close();
            this.logger.Error('ClientSession OnRecv Error!!! master: ' + this.masterID + '|' + this.masterName + ' msgID: ' + msgID, error);
        }
    }

    public OnDisConnect(info: any) {
        try {
            this.logger.Info("ClientSession disConnect!!!", info);
            this.sock.close();
        } catch (error) {
            this.logger.Warn(info, error);
        }
    }

    public OnConnectError(e: any) {
        try {
            this.sock.close();
            this.logger.Error("ClientSession connect_error!!! master: " + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
    }
    public OnError(e: any) {
        try {
            this.sock.close();
            this.logger.Error("ClientSession error!!! master: " + this.masterID + '|' + this.masterName, e);
        } catch (error) {
            this.logger.Error(e, error);
        }
    }

    public Send(data: any) {
        try {
            this.sock.send(data);
        } catch (error) {
            this.sock.close();
            this.logger.Error(data, error);
        }
    }

}