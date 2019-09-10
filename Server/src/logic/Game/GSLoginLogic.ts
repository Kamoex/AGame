import { MsgLGS } from "../../../message/message_server";
import { GameServerMsgHandler } from "../../msg_handler/GameServerMsgHandler";
import { ClientSession } from "../../net/ClientSession";
import { GameAssert } from "../../utils/Utils";
import { GameServerCfg } from "../../GameServerCfg";

export class GSLoginLogic {
    private loginSession: ClientSession;
    /** 消息处理 */
    private msgHandler: GameServerMsgHandler = GameServerMsgHandler.GetInstance();

    constructor(session: ClientSession) {
        this.loginSession = session;
    }


    public HandleMsg(recvData: any) {
        this.msgHandler.MessageHandleForLogin(this, recvData);
    }

    public SendMsg(respData: any) {
        this.loginSession.Send(respData);
    }

    public OnDisConnectLoginSrv(info: any) {
        GameAssert(null, "login disconnect!!! info: " + info);
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