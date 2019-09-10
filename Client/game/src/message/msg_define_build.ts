/**
 * 消息ID枚举定义
 * 注意！！！
 *  1.枚举禁止自己定义数字，必须按顺序顺序递增
 *  2.枚举名称必须要与消息名称一致，否则会注册不上
 */


 export enum EMessageID {
    START,
    /*------------------------------login与gs的消息---------------------------------------*/
    LGS_START,
    L2GSConnectSuccess, // 通知gs连接成功
    GS2LConnectAuth,    // gameserver请求连接login
    L2GSConnectAuth,    // 请求连接返回
    LGS_END,




    /*------------------------------login与client的消息---------------------------------------*/
    ELC_START,
    L2CServerInfo,      // 推送GameServer信息
    C2LLogin,           // client请求连接login
    L2CLogin,           // 请求连接返回
    ELC_END,




    /*------------------------------gs与client的消息---------------------------------------*/
    EGSC_START,
    C2GSConnect,        // 客户端请求连接gameserver
    GS2CConnect,        // 请求连接返回
    EGSC_END,




    END
 }
