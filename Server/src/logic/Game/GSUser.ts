import { GameServerMsgHandler } from "../../msg_handler/GameServerMsgHandler";
import { GameServer } from "../../GameServer";

export class GSUser {
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
    private msgHandler: GameServerMsgHandler = GameServerMsgHandler.GetInstance();

    constructor() {}

    public SetSocket(s: SocketIO.Socket) {
        this.sock = s;
    }

    public HandleMsg(recvData: any) {
        this.msgHandler.MessageHandleForUser(this, recvData);
    }

    public SendMsg(respData: any) {
        GameServer.GetInstance().GetCLSession().Send(this.sock, respData);
    }

    
}