import * as os from 'os'


/** SOKCET.IO连接信息 */ 
export const SOCKET_IO_CONNECT        = "connect";
export const SOCKET_IO_MESSAGE        = "message";
export const SOCKET_IO_FIRST_MSG      = "first_msg";     // 自定义消息 首次连接时 客户端发送给服务器的
export const SOCKET_IO_DISCONNECT     = "disconnect";
export const SOCKET_IO_PING           = "ping";          // 发送心跳包
export const SOCKET_IO_PONG           = "pong";          // 收到心跳包
export const SOCKET_IO_ERROR          = "error";         // 运行时错误
export const SOCKET_IO_CONNECT_ERROR  = "connect_error"; // 连接时错误

/** MARIADB的连接数量 cpu内核数量*2 + 1 */
export const MARIADB_CONNECTIONS   = (os.cpus().length) * 2 + 1;
/** 心跳超时(秒) */
export const HEART_BEAT_TIME_OUT      = 10000;
/** 心跳间隔(秒) */
export const HEART_BEAT_TIME_INTERVAL = 10000;

/** DB操作 */
export enum EDBOP {
    EDB_NULL = 0,   
    EDB_FIND = 1,
    EDB_INSERT = 2,
    EDB_UPDATE = 3,
    EDB_REPLACE = 4,
    EDB_DEL = 5,
    EDB_END
}
