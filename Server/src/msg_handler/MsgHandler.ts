
export interface IMsgHandler {
    // 消息注册
    MessageRegist();
    // 消息处理
    MessageHandle(msgID: number, msg: any);
}

// export class MessageHandler {
//     // msgName: msgkey
//     private messageMap: Object = {};
//     // msgKey: msgFunction 为了方便定义消息 会有S2C的消息函数为空
//     private messageFun: Array<Function> = new Array(EMessageID.MsgEnd);
//     constructor() {
//     }

//     // 注册消息
//     public MessageRegist() {
//         // 初始化msgName: msgkey字典
//         let props = Reflect.ownKeys(EMessageID);
//         for (let i = 0; i < EMessageID.MsgEnd; i++) {
//             let num = EMessageID.MsgEnd + 1 + i;
//             let key = props[num].toString();
//             let value = parseInt(props[i].toString());
//             this.messageMap[key] = value;
//         }
        
//         console.log("MessageRegist success!");
//         // 注册函数
//         this.messageFun[EMessageID.C2LLogin] = this.HandleC2LLogin;
//     }

//     // 消息处理
//     public MessageHandle(msgID: number, msg: any) {
//         this.messageFun[msgID](msg);
//     }

//     public HandleC2LLogin(msg: any) {

//         console.log("handle msg!!!");
//     }
// }