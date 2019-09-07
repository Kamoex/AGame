import { ELCMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";

/**
 * login与client 之间的消息处理器
 */
export class LCMsgHandler extends MsgHandler {

    /** 消息数量 */
    public static readonly msgNum: number = ELCMessageID.END - ELCMessageID.START;

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
        let props = Reflect.ownKeys(ELCMessageID);
        for (let i = 0; i <= LCMsgHandler.msgNum; i++) {
            let index = LCMsgHandler.msgNum + 1 + i;
            let msgName = props[index].toString();
            let msgKey = parseInt(props[i].toString());
            this.msgKey2Name[msgKey] = msgName;
            this.msgName2Key[msgName] = msgKey;
        }

        // 注册处理函数
        this.messageFun[ELCMessageID.L2CLogin] = this.HandleL2CLogin;

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

    private HandleL2CLogin(msg: any) {
        let m = msg as MsgLC.L2CServerInfo;

        console.log("handle msg!!!");
    }
}