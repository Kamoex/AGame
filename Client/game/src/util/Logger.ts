
/**  log工具 */
export class Logger {

    /** 打印错误 TODO之后加上把错误发送给log服务器 */
    static Error(str: string, ...optionalParams: any[]) {
        optionalParams.push(new Error().stack);
        console.error(str, ...optionalParams);
        // TODO 发送到clientlog服务器
    }

    /** 打印堆栈 */
    static Trace(str: string, ...optionalParams: any[]) {
        console.trace(str, ...optionalParams);
    }

    /** 打印调试信息(绿色) */
    static Debug(str: string, ...optionalParams: any[]) {
        console.debug('%c' + str, 'color:green', ...optionalParams);
    }

    /** 打印警告信息(蓝色) */
    static Warn(str: string, ...optionalParams: any[]) {
        console.warn('%c' + str, 'color:#37aaf1', ...optionalParams);
    }

    /** 打印log(白色) */
    static Info(str: string, ...optionalParams: any[]) {
        console.log(str, ...optionalParams);
    }
}