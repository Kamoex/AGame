import { ELGSMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgLGS, MsgBase } from "../../message/message_server";
import { LoginServer } from "../LoginServer";


/**
 * login与gameserver之间的消息处理器
 */
export class LGSMsgHandler extends MsgHandler {

    /** 消息数量 */ 
    public static readonly msgNum: number = ELGSMessageID.END - ELGSMessageID.START;

    private static ins: LGSMsgHandler = null;
    private constructor() { super() }
    public static GetInstance(): LGSMsgHandler {
        if (!LGSMsgHandler.ins)
            LGSMsgHandler.ins = new LGSMsgHandler();
        return LGSMsgHandler.ins;
    }

    /** 注册消息 */ 
    public MessageRegist() {

        // 初始化msg字典
        let props = Reflect.ownKeys(ELGSMessageID);
        for (let i = 0; i <= LGSMsgHandler.msgNum; i++) {
            let index = LGSMsgHandler.msgNum + 1 + i;
            let msgName = props[index].toString();
            let msgKey = parseInt(props[i].toString());
            this.msgKey2Name[msgKey] = msgName;
            this.msgName2Key[msgName] = msgKey;
        }

        // 注册处理函数
        // gameserver请求连接login
        this.messageFun[ELGSMessageID.GS2LConnectAuth] = this.HandleGS2LConnectAuth;

        console.log("LGSMsgHandler MessageRegist success!");
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

    /** gameserver请求连接login */
    private HandleGS2LConnectAuth(msg: any) {
        LoginServer.GetInstance().OnGameServerConnected(msg as MsgLGS.GS2LConnectAuth)
    }
}