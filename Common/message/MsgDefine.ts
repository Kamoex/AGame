
// 消息ID定义 注意：不要自己写数值 顺着往下递增
export enum EMessageID {
    MsgNull = 0,
    C2LLogin,       // 登录游戏
    L2CLogin,       // 登录游戏返回
    MsgEnd
}