import { EMessageID } from "../../message/msg_define_build";
import { MsgHandler } from "./MsgHandler";
import { MsgLGS, MsgBase, MsgGSC } from "../../message/message_server";
import { GSUser } from "../logic/Game/GSUser";
import { GSLoginLogic } from "../logic/Game/GSLoginLogic";


/**
 * login与gameserver之间的消息处理器
 */
export class GameServerMsgHandler extends MsgHandler {

    private static ins: GameServerMsgHandler = null;

    private constructor() { super(); }
    public static GetInstance(): GameServerMsgHandler {
        if (!GameServerMsgHandler.ins)
            GameServerMsgHandler.ins = new GameServerMsgHandler();
        return GameServerMsgHandler.ins;
    }

    /** 注册消息 */
    public MessageRegist() {
        MsgHandler.MessageRegist();

        // login->gs        
        this.messageFun[EMessageID.L2GSConnectSuccess] = this.HandleL2GSConnectSuccess;
        this.messageFun[EMessageID.L2GSConnectAuth] = this.HandleL2GSConnectAuth;

        // client->gs

        console.log("GameServerMsgHandler MessageRegist success!");
    }

    /** 处理客户端消息 */
    public MessageHandleForUser(logic: GSUser, recvData: any) {
        let recvMsg = MsgBase.MessageHead.decode(recvData);
        let msgID: number = recvMsg.nMsgID;
        // TODO 检测下消息长度 看是否过长
        let msgLen: number = recvMsg.nMsgLength;

        let msgName = MsgHandler.GetMsgName(msgID);
        let msgBody: any = MsgGSC[msgName].decode(recvMsg.data);
        this.messageFun[msgID](logic, msgBody);
    }

    /** 处理Login消息 */
    public MessageHandleForLogin(logic: GSLoginLogic, recvData: any) {
        let recvMsg = MsgBase.MessageHead.decode(recvData);
        let msgID: number = recvMsg.nMsgID;
        // TODO 检测下消息长度 看是否过长
        let msgLen: number = recvMsg.nMsgLength;

        let msgName = MsgHandler.GetMsgName(msgID);
        let msgBody: any = MsgLGS[msgName].decode(recvMsg.data);
        this.messageFun[msgID](logic, msgBody);
    }


    /**************************************************************************************************************/
    /*                                           login->gameserver                                                */
    /**************************************************************************************************************/


    /** login通知连接成功 */
    private HandleL2GSConnectSuccess(logic: GSLoginLogic, msg: any) {
        logic.RegistGameServerToLogin();
    }

    /** login认证返回 */
    private HandleL2GSConnectAuth(logic: GSLoginLogic, msg: any) {
        logic.HandleL2GSConnectAuth(msg as MsgLGS.L2GSConnectAuth);
    }










    /**************************************************************************************************************/
    /*                                              client->gameserver                                            */
    /**************************************************************************************************************/


    /** xxxx */
    // private HandleL2GSConnectAuth(logic: GSUser, msg: any) {
    //     console.log(msg);
    // }
}