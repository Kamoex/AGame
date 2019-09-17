import { LoginServerMsgHandler } from "../../msg_handler/LoginServerMsgHandler";
import { LoginServer } from "../../LoginServer";
import { Login } from "./LoginServerData"
import { IConnector } from "../../net/Connector";
import { LoginLog } from "../../log/LogMgr";
import { ServerSession } from "../../net/ServerSession";

export class LoginUser implements IConnector {
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

    }

    /** 接收消息 */
    public OnRecv(recvData: any) {
        this.msgHandler.MessageHandleForUser(this, recvData);
    }

    /** 断开连接与客户端 */
    public OnDisconnect(info: any) {
        try {
            this.sock.disconnect(true);
            console.log('LoginUser disconnect: ', info);
        } catch (error) {
            LoginLog.Error('LoginUser OnDisconnect Error!!! error: ' + error);
        }
    }

    /** 错误 */
    public OnError(e: any) {
        this.sock.disconnect(true);
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