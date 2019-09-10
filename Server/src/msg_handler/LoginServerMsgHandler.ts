import { EMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgLGS, MsgBase, MsgLC } from "../../message/message_server";
import { LoginLog } from "../log/LogMgr";
import { LoginUser } from "../logic/Login/LoginUser";
import { LoginGSLogic } from "../logic/Login/LoginGSLogic";

/**
 * login与gameserver之间的消息处理器
 */
export class LoginServerMsgHandler extends MsgHandler {

    private static ins: LoginServerMsgHandler = null;

    private constructor() { super(); }
    public static GetInstance(): LoginServerMsgHandler {
        if (!LoginServerMsgHandler.ins)
            LoginServerMsgHandler.ins = new LoginServerMsgHandler();
        return LoginServerMsgHandler.ins;
    }

    /** 注册消息 */
    public MessageRegist() {
        MsgHandler.MessageRegist();
        // gs->login
        this.messageFun[EMessageID.GS2LConnectAuth] = this.HandleGS2LConnectAuth;


        // client->login
        this.messageFun[EMessageID.C2LLogin] = this.HandleC2LLogin;
    }

    /** 处理客户端消息 */
    public MessageHandleForUser(logic: LoginUser, recvData: any) {
        try {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            let msgID: number = recvMsg.nMsgID;
            // TODO 检测下消息长度 看是否过长
            let msgLen: number = recvMsg.nMsgLength;
    
            let msgName = MsgHandler.GetMsgName(msgID);
            let msgBody: any = MsgLC[msgName].decode(recvMsg.data);
            this.messageFun[msgID](logic, msgBody);
        } catch (error) {
            LoginLog.Error('MessageHandleForUser error!!!', error);
        }
    }

    /** 处理GS消息 */
    public MessageHandleForGS(logic: LoginGSLogic, recvData: any) {
        try {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            let msgID: number = recvMsg.nMsgID;
            // TODO 检测下消息长度 看是否过长
            let msgLen: number = recvMsg.nMsgLength;
    
            let msgName = MsgHandler.GetMsgName(msgID);
            let msgBody: any = MsgLGS[msgName].decode(recvMsg.data);
            this.messageFun[msgID](logic, msgBody);
        } catch (error) {
            LoginLog.Error('MessageHandleForGS error!!!', error);
        }
    }


    /**************************************************************************************************************/
    /*                                           gameserver->login                                                */
    /**************************************************************************************************************/


    /** gs请求连接login */
    private HandleGS2LConnectAuth(logic: LoginGSLogic, msg: any) {
        logic.HandleGS2LConnectAuth(msg);
    }










    /**************************************************************************************************************/
    /*                                              client->login                                                 */
    /**************************************************************************************************************/

    /** 客户端请求连接login */
    private HandleC2LLogin(logic: LoginUser, msg: any) {
        console.log("handle msg!!!");
    }
}