import { ELCMessageID } from "./message/msg_define_build";


export class TestSocketIO {

    private socket: SocketIOClient.Socket;
    private serverHost: string = "http://127.0.0.1:8001";

    constructor()  {
        this.connect();
    }
    public connect(): void {

        console.log("开始连接服务器服务器: ");
        let msg2222: MsgCS.C2LLogin = MsgCS.C2LLogin.create();
        
        let self = this;
        this.socket = io.connect(this.serverHost)
        this.socket.on("connect", () => {
            // 发送消息
            let head = MsgBase.MessageHead.create();
            head.nMsgID = ELCMessageID.C2LLogin;

            let msg: MsgCS.C2LLogin = MsgCS.C2LLogin.create();
            msg.sAccount = "inuyashazh";
            msg.sPassword = "123456";
            head.data = MsgCS.C2LLogin.encode(msg).finish();
            head.nMsgLength = head.data.length;

            let bufferSend = new Laya.Byte();
            bufferSend.clear()
            bufferSend.writeArrayBuffer(MsgBase.MessageHead.encode(head).finish());

            // let people: TestPackage2.People = TestPackage2.People.create();
            // people.sName = "Mom";
            // people.nAge = 16;
            // people.PeopleType = TestPackage2.People.eTypes.e_Mom;
            // let sendMsg: TestPackage2.Parent = TestPackage2.Parent.create();
            // sendMsg.person = people;
            // sendMsg.sComment = "哈哈哈";
            this.socket.compress(true);
            this.socket.send(bufferSend.buffer);

        });

        this.socket.on("disconnect",  (e: any) => {
            console.log("disconnect: " + e)
            this.socket.close();
        })

        this.socket.on("error",  (e) => {
            console.log("error: " + e)
        })

        this.socket.on("message",  (message: any) => {
            let bufferSend = new Laya.Byte();
            bufferSend.writeArrayBuffer(message);
            let buffer: Uint8Array = new Uint8Array(bufferSend.buffer);
            let recv_msg = MsgCS.L2CLogin.decode(buffer);
            console.log("error: " + recv_msg);
        })

    }

}
