import { LoginServerMsgHandler } from "../../msg_handler/LoginServerMsgHandler";
import { LoginServer } from "../../LoginServer";
import { MsgLGS, MsgBase } from "../../../message/message_server";
import { IConnector } from "../../net/Connector";
import { LoginLog } from "../../log/LogMgr";
import { ServerSession } from "../../net/ServerSession";

export class LoginGSLogic implements IConnector {
    /** socket */
    private sock: SocketIO.Socket;
    /** loginserver的连接信息 */
    private session: ServerSession;
    /** serverid */
    public nID: number = 0;
    public sName: string = '';
    public sIP: string = '';
    public nPort: number = 0;
    public eState: MsgBase.EServerState = MsgBase.EServerState.ENULL;
    /** 认证信息 */
    public sToken: string = '';
    /** 登录时间 */
    public nLoginTime: number = 0;
    /** 登出时间 */
    public nLogoutTime: number = 0;
    /** 消息处理 */
    private msgHandler: LoginServerMsgHandler = LoginServerMsgHandler.GetInstance();

    constructor() { }

    public Init(s: SocketIO.Socket, session: ServerSession) {
        this.sock = s;
        this.session = session;
    }

    /** 连接成功 */
    public OnConnected() {
        // 通知GameServer连接成功
        this.InformGSConnectSuccess();
    }

    /** 接收消息 */
    public OnRecv(recvData: any) {
        this.msgHandler.MessageHandleForGS(this, recvData);
    }

    /** 断开连接与客户端 */
    public OnDisconnect(info: any) {
        try {
            this.sock.disconnect(true);
            console.log('gs disconnect: ', info);
        } catch (error) {
            LoginLog.Error('LoginGSLogic OnDisconnect Error!!! error: ' + error);
        }
    }

    /** 错误 */
    public OnError(e: any) {
        try {
            this.sock.disconnect(true);
            LoginLog.Error('LoginGSLogic OnError Error!!! e: ' + e);
        } catch (error) {
            LoginLog.Error('LoginGSLogic OnError Error!!! error: ' + error);
        }
    }

    /** 发送消息 */
    public SendMsg(respData: any) {
        this.session.Send(this.sock, respData);
    }

    /** 获取服务器连接状态 */
    public GetServerState(): MsgBase.EServerState {
        return this.eState;
    }

    /** 通知GS连接成功 */
    private InformGSConnectSuccess() {
        let msg = MsgLGS.L2GSConnectSuccess.create();
        this.SendMsg(msg);
    }

    /** 收到GS发来的认证 正式成功连接 */
    public HandleGS2LConnectAuth(recvData: any) {
        let data: MsgLGS.GS2LConnectAuth = recvData as MsgLGS.GS2LConnectAuth;
        this.nID = data.serverId;
        this.sName = data.serverName;
        this.sIP = data.ip;
        this.nPort = data.port;
        this.eState = MsgBase.EServerState.EOPEN;
        this.nLoginTime = Date.now();

        let msg = MsgLGS.L2GSConnectAuth.create();
        msg.success = true;
        this.SendMsg(msg);
    }
}