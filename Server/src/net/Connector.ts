
export interface ISConnector {

    /** 连接成功 */
    OnConnected();

    /** 接收消息 */
    OnRecv(recvData: any);

    /** 断开连接 */
    OnDisconnect(info: any);

    /** 错误 */
    OnError(e: any);

    /** 发送消息 */
    SendMsg(data: any);
}

export interface ICConnector {

    /** 连接成功 */
    OnConnected();

    /** 接收消息 */
    OnRecv(recvData: any);

    /** 发送心跳包 */
    OnPing();

    /** 收到心跳包 */
    OnPong();

    /** 断开连接 */
    OnDisconnect(info: any);

    /** 连接中错误(已建立socket) */
    OnError(e: any);

    /** 连接时错误(未建立socket) */
    OnConnectError(e: any);

    /** 发送消息 */
    SendMsg(data: any);
}
