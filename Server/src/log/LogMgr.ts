import * as winston from 'winston';
import { LoginServerCfg } from '../LoginServerCfg';
import { GameServerCfg } from '../GameServerCfg';
var DailyRotateFile = require('winston-daily-rotate-file');

export class LogMgr {

    private masterName: string = '';
    private logger: winston.Logger = null;

    public constructor(masterName: string, logfileName: string, size: number) {
        let res: boolean = this.Init(masterName, logfileName, size);
        if(!res) 
            console.error("LogMgr Init failed!!! masterName: " + masterName + "|logfileName " + logfileName + "| size " + size + "m");
        else 
            this.Info(logfileName + ': 日志初始化成功', true);
    }

    /**
     * 初始化日志管理器
     * @param masterName 
     * @param logfileName log文件名 
     * @param size 大小(mb)
     */
    public Init(masterName: string, logfileName: string, size: number): boolean {
        this.masterName = masterName;
        let logdir: string = './log/' + logfileName + '/';
        let transport = new DailyRotateFile({
            filename: logfileName + '_%DATE%.log',
            dirname: logdir,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
            handleExceptions: true,
            showLevel: true,
            humanReadableUnhandledException: true,
            maxsize: size + 'm'
        });

        this.logger = winston.createLogger({
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [transport]
        });
        return true;
    }

    public Info(content: string, isConsole: boolean = true) {
        this.Log(content, isConsole, 'info');
    }
    public Warn(content: string, isConsole: boolean = true) {
        this.Log(content, isConsole, 'warn');
    }
    public Error(content: string, err: any) {
        let stack: any = null;
        if(err) {
            stack = err.stack;
        }
        else {
            stack = new Error().stack;
        }
        this.Log(content + ' 出错堆栈: ' + stack, true, 'error');
        debugger;
    }
    /** 调试专用 */
    public Assert(content: string) {
        this.Log(content, true, 'debug');
    }

    private Log(content: string, isConsole: boolean, logType: string): void {
        try {
            content = 'time|' + new Date().toLocaleString() + '|' + 'master_name|' + this.masterName + '|content|' + content;
            if (!isConsole) {
                this.logger.log(logType, content);
                return;
            }

            if (logType.indexOf('info') != -1) {
                console.log('[' + new Date().toLocaleString() + ']' + logType + ': ' + content);
            } else if (logType.indexOf('warn') != -1) {
                console.log('%c [' + new Date().toLocaleString() + ']' + logType + ': ' + content, 'color:#37aaf1');
            } else if (logType.indexOf('error') != -1) {
                console.error('[' + new Date().toLocaleString() + ']' + logType + ': ' + content);
            } else if (logType.indexOf('debug') != -1) {
                console.log('%c [' + new Date().toLocaleString() + ']' + logType + ': ' + content, 'color:green');
            }

            this.logger.log(logType, content);

        } catch (error) {
            console.log('log error');
        }
    }
}

export var LoginLog: LogMgr = new LogMgr(LoginServerCfg.server_name, LoginServerCfg.log_name, LoginServerCfg.log_size);
export var GameLog: LogMgr = new LogMgr(GameServerCfg.server_name, GameServerCfg.log_name, GameServerCfg.log_size);
export var MariaLog: LogMgr = new LogMgr('MariaDB', 'MariaDBLog', 40);
export var MongoLog: LogMgr = new LogMgr('MongoDB', 'MongoDBLog', 40);