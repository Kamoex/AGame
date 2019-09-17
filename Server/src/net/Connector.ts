
export interface IConnector {
    /** 连接成功 */
    OnConnected();

    /** 接收消息 */
    OnRecv(recvData: any);

    /** 断开连接与客户端 */
    OnDisconnect(info: any);

    /** 错误 */
    OnError(e: any);

    /** 发送消息 */
    SendMsg(data: any);
}
