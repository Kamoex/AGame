
// 创建账号表 account
export const SQL_TBL_ACCOUNT = 'create table if not exists account(\
	account_id int(11) unsigned not null comment "账号ID 服务器ID*1000000 递增",\
	name varchar(255) not null default "0" comment "用户名",\
	password varchar(255) default "0" comment "密码",\
	ip varchar(255) not null default "0" comment "登录IP",\
	forbid_time int(10) not null default 0 comment "封停时间 秒 -1 永久封停",\
	primary key (account_id)\
)engine=InnoDB default charset=utf8mb4 comment="账号表";';

export const SQL_FIELD_ACCOUNT_LOGIN_TIME = 'alter table account add login_time int(11)';
