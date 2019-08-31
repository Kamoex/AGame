
/**
 * login模块儿用到的数据结构
 * 成员变量必须初始化
 * 所有注释必须用*的形式 禁止使用//
 */
export namespace Login{

    /** login中存储的gameserver信息 */
    export class GSInfo {
        /** socketID */
        public sockID: string = '';
        /** serverid */
        public id: number = 0;
        public name: string = '';
        public ip: string = '';
        public port: number = 0;
        /** 认证信息 */
        public token: string = '';
        /** 是否已连接 */
        public connected: boolean = false;
        /** 登录时间 */
        public login_time: number = 0;
        /** 登出时间 */
        public logout_time: number = 0;
    }

}
