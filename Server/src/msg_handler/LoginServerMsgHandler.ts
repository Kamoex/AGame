import { EMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgLGS, MsgBase } from "../../message/message_server";


/**
 * login与gameserver之间的消息处理器
 */
export class LoginServerMsgHandler extends MsgHandler {

    constructor() { super() }

    /** 注册消息 */
    public MessageRegist() {
        super.MessageRegist();

        // gs->login        
        this.messageFun[EMessageID.L2GSConnectAuth] = this.HandleL2GSConnectAuth;

        // client->login
        this.messageFun[EMessageID.C2LLogin] = this.HandleC2LLogin;

        console.log("LoginServerMsgHandler MessageRegist success!");
    }

    /** 消息处理 */
    public MessageHandle(recvData: any) {
        let recvMsg = MsgBase.MessageHead.decode(recvData);
        let msgID: number = recvMsg.nMsgID;
        // TODO 检测下消息长度 看是否过长
        let msgLen: number = recvMsg.nMsgLength;

        let msgName = this.GetMsgName(msgID);
        let msgBody: any = MsgLGS[msgName].decode(recvMsg.data);
        this.messageFun[msgID](msgBody);
    }


    /**************************************************************************************************************/
    /*                                           gameserver->login                                                */
    /**************************************************************************************************************/


    /** gs请求连接login */
    private HandleL2GSConnectAuth(msg: any) {
        console.log(msg);
    }










    /**************************************************************************************************************/
    /*                                              client->login                                                 */
    /**************************************************************************************************************/

    /** 客户端请求连接login */
    private HandleC2LLogin(msg: any) {
        console.log("handle msg!!!");
    }
}