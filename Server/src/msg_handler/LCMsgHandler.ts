import { EMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgBase, MsgLC } from "../../message/message_server";

/**
 * login与client 之间的消息处理器
 */
export class LCMsgHandler extends MsgHandler {

    /** 消息数量 */
    public static readonly msgNum: number = EMessageID.ELC_END - EMessageID.ELC_START;

    private static ins: LCMsgHandler = null;
    private constructor() { super(); }
    public static GetInstance(): LCMsgHandler {
        if (!LCMsgHandler.ins)
            LCMsgHandler.ins = new LCMsgHandler();
        return LCMsgHandler.ins;
    }

    /** 注册消息 */
    public MessageRegist() {

        // 初始化msg字典
        let props = Reflect.ownKeys(EMessageID);
        for (let i = 1; i <= LCMsgHandler.msgNum; i++) {
            let keyIndex = EMessageID.ELC_START + i;
            let nameIndex = EMessageID.END + EMessageID.ELC_START + i + 1;
            let msgName = props[nameIndex].toString();
            let msgKey = parseInt(props[keyIndex].toString());
            this.msgKey2Name[msgKey] = msgName;
            this.msgName2Key[msgName] = msgKey;
        }

        // 注册处理函数
        this.messageFun[EMessageID.C2LLogin] = this.HandleC2LLogin;

        console.log("LCMsgHandler MessageRegist success!");
    }

    /** 消息处理 */
    public MessageHandle(recvData: any) {
        let recvMsg = MsgBase.MessageHead.decode(recvData);
        let msgID: number = recvMsg.nMsgID;
        let msgLen: number = recvMsg.nMsgLength;

        let msgName = this.GetMsgName(msgID);
        let msgBody: any = MsgLC[msgName].decode(recvMsg.data);
        // TODO 检测下消息长度 看是否过长
        this.messageFun[msgID](msgBody);
    }

    private HandleC2LLogin(msg: any) {

        console.log("handle msg!!!");
    }
}