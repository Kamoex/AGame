import { ELGSMessageID } from "../../message/msg_define_build";
import { IMsgHandler } from "./MsgHandler";


/**
 * login与gameserver之间的消息处理器
 */
export class LGSMsgHandler implements IMsgHandler {

    // 消息数量
    public static readonly msgNum: number = ELGSMessageID.END - ELGSMessageID.START;
    // msgName: msgkey
    private msgName2Key: Object = {};
    // msgkey: msgName
    private msgKey2Name: Object = {};
    // msgName: msgFunction
    private messageFun: any = {};
    
    private static ins: LGSMsgHandler = null;
    private constructor() {}
    public static GetInstance(): LGSMsgHandler {
        if (!LGSMsgHandler.ins)
            LGSMsgHandler.ins = new LGSMsgHandler();
        return LGSMsgHandler.ins;
    }

    // 注册消息
    public MessageRegist() {

        // 初始化msg字典
        let props = Reflect.ownKeys(ELGSMessageID);
        for (let i = 0; i <= LGSMsgHandler.msgNum; i++) {
            let index = LGSMsgHandler.msgNum + 1 + i;
            let msgName = props[index].toString();
            let msgKey = parseInt(props[i].toString());
            this.msgName2Key[msgKey] = msgName;
            this.msgKey2Name[msgName] = msgKey;
        }
        
        // 注册处理函数
        // this.messageFun[EGSCMessageID.C2LLogin] = this.HandleC2LLogin;

        console.log("LGSMsgHandler MessageRegist success!");
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