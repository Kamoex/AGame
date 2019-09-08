import { EMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgLGS, MsgBase } from "../../message/message_server";


/**
 * login与gameserver之间的消息处理器
 */
export class GameServerMsgHandler extends MsgHandler {

    constructor() { super() }

    /** 注册消息 */
    public MessageRegist() {
        super.MessageRegist();

        // login->gs        
        this.messageFun[EMessageID.L2GSConnectAuth] = this.HandleL2GSConnectAuth;

        // client->gs

        console.log("GameServerMsgHandler MessageRegist success!");
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
    /*                                           login->gameserver                                                */
    /**************************************************************************************************************/


    /** login认证返回 */
    private HandleL2GSConnectAuth(msg: any) {
        console.log(msg);
    }










    /**************************************************************************************************************/
    /*                                              client->gameserver                                            */
    /**************************************************************************************************************/

    
}