import { EMessageID } from "../../message/msg_define_build";


export class MessageHandler {

    private static ins: MessageHandler = null;
    private messageCL: Object = {};
    private constructor() {
    }

    public static GetInstance(): MessageHandler {
        if (!MessageHandler.ins)
            MessageHandler.ins = new MessageHandler();
        return MessageHandler.ins;
    }

    // 注册消息
    public MessageRegist() {
        // 注册Client<->Login消息
        this.MessageRegistCL();
    }

    // 注册Client<->Login消息
    public MessageRegistCL() {
        let props = Reflect.ownKeys(EMessageID);
        for (let i = 0; i < EMessageID.MsgEnd; i++) {
            let num = EMessageID.MsgEnd + 1 + i;
            let key = props[num].toString();
            let value = parseInt(props[i].toString());
            this.messageCL[key] = value;
        }
    }

    public MessageHandle(msgID: number, msg: any, len: number) {
        this.messageCL[msgID](msg);
    }

    public HandleC2LLogin(msg: any) {

        console.log("handle msg!!!");
    }
}