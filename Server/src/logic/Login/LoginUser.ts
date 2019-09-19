import { LoginServerMsgHandler } from "../../msg_handler/LoginServerMsgHandler";
import { LoginServer } from "../../LoginServer";
import { Login } from "./LoginServerData"
import { ISConnector } from "../../net/Connector";
import { LoginLog } from "../../log/LogMgr";
import { ServerSession } from "../../net/ServerSession";
import { MsgLC } from "../../../message/message_server";

export class LoginUser implements ISConnector {
    /** socket */
    private sock: SocketIO.Socket;
    /** loginserver的连接信息 */
    private session: ServerSession;
    /** 认证信息 */
    public token: string = '';
    /** 是否已连接 */
    public connected: boolean = false;
    /** user信息 */
    public user: Login.LoginUserInfo = new Login.LoginUserInfo;
    /** 登录时间 */
    public login_time: number = 0;
    /** 登出时间 */
    public logout_time: number = 0;
    /** 消息处理 */
    private msgHandler: LoginServerMsgHandler = LoginServerMsgHandler.GetInstance();

    constructor() { }


    /** 初始化 user 信息 */
    public Init(s: SocketIO.Socket, session: ServerSession) {
        this.sock = s;
        this.session = session;
    }

    /** 连接成功 */
    public OnConnected() {
        // let msg = MsgLC.L2CLogin.create();
        // msg.bNeedCreate = true;
        // msg.roleInfo = MsgLC.SimRoleInfo.create();
        // msg.roleInfo.nID = 1;
        // msg.roleInfo.sName = 'hahah';
        // this.SendMsg(msg);

        // 发送给客户端gameserver信息
        let msg: MsgLC.L2CServerInfo = MsgLC.L2CServerInfo.create();
        for (let i = 0; i < 3; i++) {
            let msg2: MsgLC.ServerInfo = MsgLC.ServerInfo.create();
            // msg.nID = this.gameServers[0].nID;
            // msg.sName = this.gameServers[0].sName;
            // msg.sIp = this.gameServers[0].sIP;
            // msg.nPort = this.gameServers[0].nPort;
            // msg.eState = MsgBase.EServerState.EOPEN;
            msg2.nID = (i + 1) * 1000;
            msg2.sName = i.toString();
            msg2.sIp = i.toString() + ".1.1.1";
            msg2.nPort = (i + 1) * 1000 + 1;
            msg2.eState = i;
            msg.serverInfos.push(msg2);
        }
        this.SendMsg(msg);
    }

    /** 接收消息 */
    public OnRecv(recvData: any) {
        this.msgHandler.MessageHandleForUser(this, recvData);
    }

    /** 断开连接与客户端 */
    public OnDisconnect(info: any) {
        try {
            this.sock.disconnect(true);
            this.session.RemoveConnector(this.sock.id);
            console.log('LoginUser disconnect: ', info);
        } catch (error) {
            LoginLog.Error('LoginUser OnDisconnect Error!!! error: ' + error);
        }
    }

    /** 错误 */
    public OnError(e: any) {
        this.sock.disconnect(true);
        this.session.RemoveConnector(this.sock.id);
        LoginLog.Error('LoginUser OnError Error!!! error: ' + e);
    }

    /** 发送消息 */
    public SendMsg(data: any) {
        LoginServer.GetInstance().GetCLSession().Send(this.sock, data);
    }

    public GetSockID(): string {
        return this.sock.id;
    }
}