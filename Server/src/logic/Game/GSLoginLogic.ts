import { MsgLGS } from "../../../message/message_server";
import { GameServerMsgHandler } from "../../msg_handler/GameServerMsgHandler";
import { ClientSession } from "../../net/ClientSession";
import { GameServerCfg } from "../../GameServerCfg";
import { ICConnector } from "../../net/Connector";
import { GameLog } from "../../log/LogMgr";

export class GSLoginLogic implements ICConnector{
    private loginSession: ClientSession = null;
    /** 消息处理 */
    private msgHandler: GameServerMsgHandler = GameServerMsgHandler.GetInstance();

    constructor(session: ClientSession) {
        this.loginSession = session;
    }

    /** 连接成功 */
    public OnConnected() {
        GameLog.Assert("connected loginserver success! url: " + this.loginSession.sUrl);
    }

    /** 重连成功 */
    public OnReConnect(attempNum: number) {
        GameLog.Assert("reconnected loginserver success! times: " + attempNum + " url: " + this.loginSession.sUrl);
    }

    /** 接收消息 */
    public OnRecv(recvData: any) {
        this.msgHandler.MessageHandleForLogin(this, recvData)
    }

    /** 发送心跳包 */
    public OnPing() {
        
    }

    /** 收到心跳包 */
    public OnPong() {

    }

    /** 断开连接 */
    public OnDisconnect(info: any) {
        GameLog.Assert("login disconnect!!! info: " + info);
    }

    /** 连接中错误(已建立socket) */
    public OnError(e: any) {
        GameLog.Error("GSLoginLogic OnError! ", e);
    }

    /** 连接时错误(未建立socket) */
    public OnConnectError(e: any) {
        GameLog.Error("GSLoginLogic OnConnectError! ", e);
    }

    /** 重连错误 */
    public OnReConnectError(e: any) {
        GameLog.Error("GSLoginLogic OnReConnectError! ", e);
    }


    /** 发送消息 */
    public SendMsg(data: any) {
        this.loginSession.Send(data);
    }

    
    /** 向login注册gameserver信息 */
    public RegistGameServerToLogin() {
        let msg: MsgLGS.GS2LConnectAuth = MsgLGS.GS2LConnectAuth.create();
        msg.ip = GameServerCfg.ip;
        msg.port = GameServerCfg.port;
        msg.serverId = GameServerCfg.server_id;
        msg.serverName = GameServerCfg.server_name;
        msg.token = '';
        this.SendMsg(msg);
    }

    /** 收到login认证返回 */
    public HandleL2GSConnectAuth(msg: MsgLGS.L2GSConnectAuth) {
        console.log(msg);
    }

}