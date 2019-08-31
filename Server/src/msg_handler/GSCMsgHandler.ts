import { EGSCMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgBase, MsgGSC } from "../../message/message_server";

/**
 * gameserver与client之间的消息处理器
 */
export class GSCMsgHandler extends MsgHandler {

    /** 消息数量 */ 
    public static readonly msgNum: number = EGSCMessageID.END - EGSCMessageID.START;

    private static ins: GSCMsgHandler = null;
    private constructor() { super();}
    public static GetInstance(): GSCMsgHandler {
        if (!GSCMsgHandler.ins)
            GSCMsgHandler.ins = new GSCMsgHandler();
        return GSCMsgHandler.ins;
    }

    /** 注册消息 */
    public MessageRegist() {

        // 初始化msg字典
        let props = Reflect.ownKeys(EGSCMessageID);
        for (let i = 0; i <= GSCMsgHandler.msgNum; i++) {
            let index = GSCMsgHandler.msgNum + 1 + i;
            let msgName = props[index].toString();
            let msgKey = parseInt(props[i].toString());
            this.msgKey2Name[msgKey] = msgName;
            this.msgName2Key[msgName] = msgKey;
        }
        
        // 注册处理函数
        // this.messageFun[EGSCMessageID.C2LLogin] = this.HandleC2LLogin;

        console.log("GSCMsgHandler MessageRegist success!");
    }

    /** 消息处理 */
    public MessageHandle(recvData: any) {
        let recvMsg = MsgBase.MessageHead.decode(recvData);
        let msgID: number = recvMsg.nMsgID;
        let msgLen: number = recvMsg.nMsgLength;

        let msgName = this.GetMsgName(msgID);
        let msgBody: any = MsgGSC[msgName].decode(recvMsg.data);
        // TODO 检测下消息长度 看是否过长
        this.messageFun[msgID](msgBody);
    }

    // public HandleC2LLogin(msg: any) {
    //     console.log("handle msg!!!");
    // }
}