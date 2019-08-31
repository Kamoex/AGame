/**
 * 消息ID枚举定义
 * 注意！！！
 *  1.枚举禁止自己定义数字，必须按顺序顺序递增
 *  2.枚举名称必须要与消息名称一致，否则会注册不上
 */


/** login_server与game_server的消息 */
export enum ELGSMessageID {
    START = 0,
    GS2LConnectAuth,    // gameserver请求连接login
    L2GSConnectAuth,    // 请求连接返回
    END
}

/** login_server与client的消息 */
export enum ELCMessageID {
    START = ELGSMessageID.END,
    C2LLogin,       // client请求连接login
    L2CLogin,       // 请求连接返回
    END
}

/** game_server与client的消息 */
export enum EGSCMessageID {
    START = ELCMessageID.END,
    C2GSConnect,    // 客户端请求连接gameserver
    GS2CConnect,    // 请求连接返回
    END
}