
/**
 * login模块儿用到的数据结构
 * 成员变量必须初始化
 * 所有注释必须用*的形式 禁止使用//
 */
export namespace Login {

    /** login中存储的gameserver信息 */
    export class GSInfo {
        /** socketID */
        public sockID: string = '';
        /** serverid */
        public nID: number = 0;
        public sName: string = '';
        public sIP: string = '';
        public nPort: number = 0;
        /** 认证信息 */
        public sToken: string = '';
        /** 是否已连接 */
        public bConnected: boolean = false;
        /** 登录时间 */
        public nLoginTime: number = 0;
        /** 登出时间 */
        public nLogoutTime: number = 0;
    }

    /** login 登录的角色信息 TODO pool */
    export class LoginUserInfo {
        /** 账号 */
        public sAccount: string;
        /** 密码 */
        public sPwd: string;
        /** 登录时间 */
        public nLoginTime: number;
        /** 登出时间 */
        public nLogoutTime: number;

        public Copy(data: LoginUserInfo) {
            this.sAccount = data.sAccount;
            this.sPwd = data.sPwd;
            this.nLoginTime = data.nLoginTime;
            this.nLogoutTime = data.nLogoutTime;
        }
    }

}
