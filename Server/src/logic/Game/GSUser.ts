import { GameServerMsgHandler } from "../../msg_handler/GameServerMsgHandler";
import { GameServer } from "../../GameServer";
import { ISConnector } from "../../net/Connector";
import { ServerSession } from "../../net/ServerSession";
import { GameLog } from "../../log/LogMgr";

export class GSUser implements ISConnector {
    /** socket */
    private sock: SocketIO.Socket;
    /** gs的连接信息 */
    private session: ServerSession;
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

    public Init(s: SocketIO.Socket, session: ServerSession) {
        this.sock = s;
        this.session = session;
    }

    /** 连接成功 */
    public OnConnected() {
        console.log("gs a user connected!!!");
    }

    /** 接收消息 */
    public OnRecv(recvData: any) {
        this.msgHandler.MessageHandleForUser(this, recvData);
    }

    /** 断开连接与客户端 */
    public OnDisconnect(info: any) {
        try {
            this.sock.disconnect(true);
            console.log('GameUser disconnect: ', info);
        } catch (error) {
            GameLog.Error('GameUser OnDisconnect Error!!! error: ' + error);
        }
    }

    /** 错误 */
    public OnError(e: any) {
        this.sock.disconnect(true);
        GameLog.Error('LoginUser OnError Error!!! error: ' + e);
    }

    /** 发送消息 */
    public SendMsg(respData: any) {
        GameServer.GetInstance().GetCLSession().Send(this.sock, respData);
    }
    
}