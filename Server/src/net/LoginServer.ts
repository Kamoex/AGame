import { ServerBase } from "./ServerBase";
import { MessageHandler } from "./MessageHandler";
import { SOCKET_CONNECTION, SOCKET_MESSAGE, SOCKET_DISCONNECTION, SOCKET_ERROR } from "../common/CommonDefine";
import { MsgBase } from "../../message/message_server";
import { MariaDBMgr } from "../db/MariaDBMgr";
import { LoginServerCfg } from "../LoginServerCfg";
import { MongoDBMgr } from "../db/MongoDBMgr";
import { LogMgr } from "../log/LogMgr";


export class LoginServer extends ServerBase {

    public mariaDB: MariaDBMgr = new MariaDBMgr();

    private static ins: LoginServer = null;
    private constructor() {
        super()
    }

    public static GetInstance(): LoginServer {
        if (!LoginServer.ins)
            LoginServer.ins = new LoginServer();
        return LoginServer.ins;
    }

    // 初始化服务器
    async Init() {
        await this.mariaDB.Init(LoginServerCfg.mariadb_cfg);
    }

    // 启动服务器
    public StartServer(port: number) {
        this.CreateServerIO(port);
        this.infos = this.serverIO.on(SOCKET_CONNECTION, this.OnConnected);
    }

    // 连接成功
    private OnConnected(socket: SocketIO.Socket) {
        console.log('a client connected!!! socket: ' + socket);

        // 消息处理
        socket.on(SOCKET_MESSAGE, (recvData: any) => {
            LoginServer.GetInstance().OnRecv(socket, recvData);
        });

        socket.on(SOCKET_DISCONNECTION, (info: any) => {
            LoginServer.GetInstance().OnDisconnect(socket, info);
        });

        socket.on(SOCKET_ERROR, (error: any) => {
            LoginServer.GetInstance().OnDisconnect(socket, error);
        });
    }

    // 接收消息
    private OnRecv(socket: SocketIO.Socket, recvData: any): void {
        try {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            MessageHandler.GetInstance().MessageHandle(recvMsg.nMsgID, recvMsg.data);
            console.log("data_decode: ", recvData);
        } catch (error) {
            console.log(error.stack);
        }
    }

    // 断开连接与客户端
    private OnDisconnect(socket: SocketIO.Socket, info: any): void {
        console.log("client disconnect: ", info);
    }

    // 错误
    private OnError(error: any): void {
        console.log("LoginServer error: ", error);
    }
}

async function StartLoginServer() {
    try {
        // 读取配置表

        // 注册消息
        MessageHandler.GetInstance().MessageRegist();

        await LoginServer.GetInstance().Init();
        LoginServer.GetInstance().StartServer(8001);

    } catch (error) {
        console.error(error);
    }
}

StartLoginServer();
