
import {LogMgr, MongoLog, MariaLog, GameLog, LoginLog} from '../log/LogMgr'

export function MongoAssert(obj: any, log: string): boolean {
    if(obj == false || obj == 0 || obj == null || obj == undefined) {
        MongoLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function MariaAssert(obj: any, log: string): boolean {
    if(obj == false || obj == 0 || obj == null || obj == undefined) {
        MariaLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function GameAssert(obj: any, log: string,): boolean {
    if(obj == false || obj == 0 || obj == null || obj == undefined) {
        GameLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function LoginAssert(obj: any, log: string): boolean {
    if(obj == false || obj == 0 || obj == null || obj == undefined) {
        LoginLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}