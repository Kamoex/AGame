
import {LogMgr, MongoLog, MariaLog, GameLog, LoginLog} from '../log/LogMgr'

export function MongoAssert(obj: any, log: string): boolean {
    if(!obj) {
        MongoLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function MariaAssert(obj: any, log: string): boolean {
    if(!obj) {
        MariaLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function GameAssert(obj: any, log: string,): boolean {
    if(!obj) {
        GameLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}

export function LoginAssert(obj: any, log: string): boolean {
    if(!obj) {
        LoginLog.Assert(log);
        debugger;
        return true;
    }
    return false;
}