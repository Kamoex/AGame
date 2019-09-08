import { MariaDBMgr } from "./db/MariaDBMgr";
import { LoginServerCfg } from "./LoginServerCfg";
import { ServerSession } from "./net/ServerSession";
import { LoginLog } from "./log/LogMgr";
import { MsgLGS, MsgBase, MsgLC } from "./../message/message_server";
import { Login } from './logic/Login/LoginServerData'
import { SOCKET_IO_FIRST_MSG, EDBOP, SOCKET_IO_CONNECT, SOCKET_IO_MESSAGE } from "./common/CommonDefine";
import { EMessageID } from "../message/msg_define_build";
import { LoginServerMsgHandler } from "./msg_handler/LoginServerMsgHandler";


export class LoginServer {

    private mariaDB: MariaDBMgr = new MariaDBMgr();
    /** client连接信息处理 */
    private clSession: ServerSession = null;
    /** gameserver连接信息处理 */
    private gsSession: ServerSession = null;
    /** 消息处理 */
    private msgHandler: LoginServerMsgHandler = new LoginServerMsgHandler();
    /** 所有连接到login的gameserver信息 */
    private gameServers: Array<Login.GSInfo> = [];

    private static ins: LoginServer = null;
    private constructor() { }
    public static GetInstance(): LoginServer {
        if (!LoginServer.ins)
            LoginServer.ins = new LoginServer();
        return LoginServer.ins;
    }

    /** 初始化服务器 */
    public async Init() {
        // 消息注册
        this.msgHandler.MessageRegist();
        // DB初始化
        await this.mariaDB.Init(LoginServerCfg.mariadb_cfg);
        // 初始化session
        this.gsSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, this.msgHandler, LoginLog);
        this.gsSession.SetEventFun(SOCKET_IO_MESSAGE, this.OnRecvGameMsg.bind(this))
        this.clSession = new ServerSession(LoginServerCfg.server_id, LoginServerCfg.server_name, this.msgHandler, LoginLog);
        this.clSession.SetEventFun(SOCKET_IO_FIRST_MSG, this.OnClientConnected.bind(this))
    }

    /** 启动服务器 */
    public StartServer() {
        this.clSession.CreateSession(LoginServerCfg.client_port);
        this.gsSession.CreateSession(LoginServerCfg.gs_port);
    }
    
    /** 接收到gameserver消息 */
    public OnRecvGameMsg(socket: SocketIO.Socket, data: any) {
        
    }

    /** 接收到gameserver的连接 */
    public OnGameServerConnected(socket: SocketIO.Socket, data: any) {
        let recvMsg: MsgBase.MessageHead = MsgBase.MessageHead.decode(data);
        let recvData: MsgLGS.GS2LConnectAuth = MsgLGS.GS2LConnectAuth.decode(recvMsg.data)

        // 收到的gameserver信息
        let gsInfo: Login.GSInfo = new Login.GSInfo();
        gsInfo.sockID = socket.id;
        gsInfo.ip = socket.handshake.address;
        gsInfo.id = recvData.serverId;
        gsInfo.port = recvData.port;
        gsInfo.name = recvData.serverName;
        gsInfo.token = recvData.token;
        gsInfo.login_time = new Date().getTime();
        this.gameServers.push(gsInfo);

        let msg = MsgLGS.L2GSConnectAuth.create();
        msg.success = true;
        
        // head.nMsgID = EMessageID.L2GSConnectAuth;
        // head.data = MsgLGS.L2GSConnectAuth.encode(msg).finish();
        // head.nMsgLength = head.data.byteLength;

        this.gsSession.Send(socket, msg);

        // 广播给客户端
        // let msg: MsgLC.L2CServerInfo = MsgLC.L2CServerInfo.create();
        // msg.serverInfos[0].nID = gsInfo.id;
        // msg.serverInfos[0].sName = gsInfo.name;
        // msg.serverInfos[0].sIp = gsInfo.ip;
        // msg.serverInfos[0].nPort = gsInfo.port;
        // msg.serverInfos[0].eState = MsgLC.ServerInfo.EServerState.EOPEN;
        // this.clSession.BroadCast(MsgLC.L2CServerInfo.encode(msg).finish());
    }
    
    /** 接收到client的连接 */
    public OnClientConnected(socket: SocketIO.Socket, data: any) {
        // 广播给客户端
        let msg: MsgLC.L2CServerInfo = MsgLC.L2CServerInfo.create();
        let serverInfo: MsgLC.ServerInfo = MsgLC.ServerInfo.create();
        msg.serverInfos = MsgLC.ServerInfo.create();
        msg.serverInfos.nID = this.gameServers[0].id;
        msg.serverInfos.sName = this.gameServers[0].name;
        msg.serverInfos.sIp = this.gameServers[0].ip;
        msg.serverInfos.nPort = this.gameServers[0].port;
        msg.serverInfos.eState = MsgLC.ServerInfo.EServerState.EOPEN;
        // MsgLC.ServerInfo.encode(msg.serverInfos).finish();
        // msg.serverInfos = serverInfo;
        // msg.serverInfos.push(serverInfo);
        let buffer = MsgLC.L2CServerInfo.encode(msg).finish();
        // let buffer2 = MsgLC.ServerInfo.encode(msg.serverInfos).finish();
        this.clSession.Send(socket, msg);

        let dccc = MsgLC.L2CServerInfo.decode(buffer);
        let  b = 3;

        // let msghead = MsgBase.MessageHead.create();
        // msghead.nMsgID = ELCMessageID.L2CServerInfo;
        // msghead.nMsgLength = buffer.byteLength;
        // msghead.data = buffer; 
        // this.clSession.Send(socket, MsgBase.MessageHead.encode(msghead).finish());
    }
    
}

let paramAry = process.argv.slice(2);

/** 启动loginserver */
async function StartLoginServer(param: string) {
    if (param != "st_lg") {
        return;
    }
    try {
        // 读取配置表

        await LoginServer.GetInstance().Init();
        await LoginServer.GetInstance().StartServer();

    } catch (error) {
        console.error(error);
        debugger;
    }
}

StartLoginServer(paramAry[0]);
