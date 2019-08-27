import * as os from 'os'


// SOKCET连接信息
export const SOCKET_CONNECTION     = "connection";
export const SOCKET_MESSAGE        = "message";
export const SOCKET_DISCONNECTION  = "disconnect";
export const SOCKET_ERROR          = "error";

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
