/**
 * 常量定义
 */


 /** 
 *  socket.io-client 定义事件 写了一部分 需要用到的 可以在commondefine.ts里加
 *  connect
 * 	connect_error
 * 	connect_timeout
 * 	connecting
 * 	disconnect
 * 	error
 * 	reconnect
 * 	reconnect_attempt
 * 	reconnect_failed
 * 	reconnect_error
 * 	reconnecting
 * 	ping
 * 	pong
 */
export const SOCKET_IO_CONNECT        = "connect";
export const SOCKET_IO_RECONNECT      = "reconnect";
export const SOCKET_IO_MESSAGE        = "message";
export const SOCKET_IO_DISCONNECT     = "disconnect";
export const SOCKET_IO_PING           = "ping";          // 发送心跳包
export const SOCKET_IO_PONG           = "pong";          // 收到心跳包
export const SOCKET_IO_ERROR          = "error";         // 运行时错误
export const SOCKET_IO_RECONNECT_ERROR= "reconnect_error";  // 重连错误
export const SOCKET_IO_CONNECT_ERROR  = "connect_error"; // 连接时错误


export const ERROR_NONE               = "none";          // 不处理的错误类型