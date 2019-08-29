import { EGSCMessageID } from "../../message/msg_define_build";
import { IMsgHandler } from "./MsgHandler";


export class GSCMsgHandler implements IMsgHandler {

    // 消息数量
    public static readonly msgNum: number = EGSCMessageID.END - EGSCMessageID.START;
    // msgName: msgkey
    private msgName2Key: Object = {};
    // msgkey: msgName
    private msgKey2Name: Object = {};
    // msgName: msgFunction
    private messageFun: any = {};
    
    private static ins: GSCMsgHandler = null;
    private constructor() {}
    public static GetInstance(): GSCMsgHandler {
        if (!GSCMsgHandler.ins)
            GSCMsgHandler.ins = new GSCMsgHandler();
        return GSCMsgHandler.ins;
    }

    // 注册消息
    public MessageRegist() {

        // 初始化msg字典
        let props = Reflect.ownKeys(EGSCMessageID);
        for (let i = 0; i < GSCMsgHandler.msgNum; i++) {
            let index = EGSCMessageID.END + 1 + i;
            let msgKey = props[index].toString();
            let msgName = parseInt(props[i].toString());
            this.msgName2Key[msgKey] = msgName;
            this.msgKey2Name[msgName] = msgKey;
        }
        
        // 注册处理函数
        // this.messageFun[EGSCMessageID.C2LLogin] = this.HandleC2LLogin;

        console.log("MessageRegist success!");
    }

    // 根据消息ID 获取 消息名字
    public GetMsgName(msgKey: number) {
        return this.msgKey2Name[msgKey];
    }

    // 根据消息名字 获取 消息ID
    public GetMsgKey(msgName: string) {
        return this.msgName2Key[msgName];
    }

    // 消息处理
    public MessageHandle(msgID: number, msg: any) {
        this.messageFun[msgID](msg);
    }

    // public HandleC2LLogin(msg: any) {

    //     console.log("handle msg!!!");
    // }
}