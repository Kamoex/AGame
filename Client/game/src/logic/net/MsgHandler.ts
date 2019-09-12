import { EMessageID } from "../../message/msg_define_build";

export class MsgHandler {
    /** 消息字典 msgName: msgkey */
    private static msgName2Key: Object = {};
    /** 消息字典 msgkey: msgName */
    private static msgKey2Name: Object = {};
    /** 消息处理函数 msgName: msgFunction */
    private messageFun: any = {};

    /** 注册消息 */
    public static MessageRegist() { 
        // 初始化msg字典
        let props = Reflect.ownKeys(EMessageID);
        for (let i = 1; i <= EMessageID.EGSC_END; i++) {
            let keyIndex = EMessageID.ELC_START + i;
            let nameIndex = EMessageID.END + i + 1;
            let msgName = props[nameIndex].toString();
            let msgKey = parseInt(props[keyIndex].toString());
            this.msgKey2Name[msgKey] = msgName;
            this.msgName2Key[msgName] = msgKey;
        }
    }

    /** 根据消息ID 获取 消息名字 */
    public static GetMsgName(msgKey: number): string {
        return this.msgKey2Name[msgKey];
    }

    /** 根据消息名字 获取 消息ID */
    public static GetMsgKey(msgName: string): number {
        return this.msgName2Key[msgName];
    }


}