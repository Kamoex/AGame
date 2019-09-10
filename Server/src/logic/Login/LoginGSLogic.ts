import { LoginServerMsgHandler } from "../../msg_handler/LoginServerMsgHandler";
import { LoginServer } from "../../LoginServer";
import { MsgLGS, MsgBase } from "../../../message/message_server";

export class LoginGSLogic {
    /** socket */
    public sock: SocketIO.Socket;
    /** serverid */
    public nID: number = 0;
    public sName: string = '';
    public sIP: string = '';
    public nPort: number = 0;
    public eState: MsgBase.EServerState =  MsgBase.EServerState.ENULL;
    /** 认证信息 */
    public sToken: string = '';
    /** 登录时间 */
    public nLoginTime: number = 0;
    /** 登出时间 */
    public nLogoutTime: number = 0;
    /** 消息处理 */
    private msgHandler: LoginServerMsgHandler = LoginServerMsgHandler.GetInstance();

    constructor() {}

    public SetSocket(s: SocketIO.Socket) {
        this.sock = s;
    }

    public HandleMsg(recvData: any) {
        this.msgHandler.MessageHandleForGS(this, recvData);
    }

    public SendMsg(respData: any) {
        LoginServer.GetInstance().GetCLSession().Send(this.sock, respData);
    }

    /** 获取服务器连接状态 */
    public GetServerState(): MsgBase.EServerState {
        return this.eState;
    }

    /** 更新server信息 */
    public UpdateInfo(gsLogic: LoginGSLogic) {
        this.nID = gsLogic.nID;
        this.sName = gsLogic.sName;
        this.sIP = gsLogic.sIP;
        this.nPort = gsLogic.nPort;
        this.eState = gsLogic.eState;
    }
    
    /** 通知GS连接成功 */
    public InformGSConnectSuccess() {
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

        LoginServer.GetInstance().AddGSLogic(this);

        let msg = MsgLGS.L2GSConnectAuth.create();
        msg.success = true;
        this.SendMsg(msg);
    }
}