import { LoginServerMsgHandler } from "../../msg_handler/LoginServerMsgHandler";
import { LoginServer } from "../../LoginServer";

export class LoginUser {
    /** socket */
    public sock: SocketIO.Socket;
    /** 认证信息 */
    public token: string = '';
    /** 是否已连接 */
    public connected: boolean = false;
    /** 登录时间 */
    public login_time: number = 0;
    /** 登出时间 */
    public logout_time: number = 0;
    /** 消息处理 */
    private msgHandler: LoginServerMsgHandler = LoginServerMsgHandler.GetInstance();

    constructor() {}

    public SetSocket(s: SocketIO.Socket) {
        this.sock = s;
    }

    public HandleMsg(recvData: any) {
        this.msgHandler.MessageHandleForUser(this, recvData);
    }

    public SendMsg(respData: any) {
        LoginServer.GetInstance().GetCLSession().Send(this.sock, respData);
    }

    
}