import * as os from 'os'


// SOKCET.IO连接信息
export const SOCKET_IO_CONNECTION     = "connection";
export const SOCKET_IO_MESSAGE        = "message";
export const SOCKET_IO_DISCONNECTION  = "disconnect";
export const SOCKET_IO_ERROR          = "error";
// WEBSOCKET连接信息
export const SOCKET_WS_REQUEST        = "request";
export const SOCKET_WS_MESSAGE        = "message";
export const SOCKET_WS_BINARY         = "binary";
export const SOCKET_WS_CLOSE          = "close";

// MARIADB的连接数量 cpu内核数量*2 + 1
export const MARIADB_CONNECTIONS   = (os.cpus().length) * 2 + 1;
// DB操作
export enum EDBOP {
    EDB_NULL = 0,   
    EDB_FIND = 1,
    EDB_INSERT = 2,
    EDB_UPDATE = 3,
    EDB_REPLACE = 4,
    EDB_DEL = 5,
    EDB_END
}
