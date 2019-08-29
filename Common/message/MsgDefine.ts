/**
 * 消息ID枚举定义
 * 注意！！！
 *  1.枚举禁止自己定义数字，必须按顺序顺序递增
 *  2.枚举名称必须要与消息名称一致，否则会注册不上
 */


// login_server与game_server的消息
export enum ELGSMessageID {
    START = 0,
    END
}

// login_server与client的消息
export enum ELCMessageID {
    START = ELGSMessageID.END,
    C2LLogin,       // 登录游戏
    L2CLogin,       // 登录游戏返回
    END
}

// game_server与client的消息
export enum EGSCMessageID {
    START = ELCMessageID.END,
    END
}