
export class TestSocketIO {

    private socket: SocketIOClient.Socket;
    private serverHost: string = "http://127.0.0.1:8001";

    constructor()  {
        this.connect();
    }
    public connect(): void {

        console.log("开始连接服务器服务器: ");
        let self = this;
        this.socket = io.connect(this.serverHost)
        this.socket.on("connect", () => {
            // 发送消息
            let msg2: TestPackage2.People = TestPackage2.People.create();
            msg2.sName = "Dad";
            msg2.nAge = 60;
            msg2.PeopleType = 1;
            let bufferSend = new Laya.Byte();
            bufferSend.clear()
            bufferSend.writeArrayBuffer(TestPackage2.People.encode(msg2).finish());
            // let people: TestPackage2.People = TestPackage2.People.create();
            // people.sName = "Mom";
            // people.nAge = 16;
            // people.PeopleType = TestPackage2.People.eTypes.e_Mom;
            // let sendMsg: TestPackage2.Parent = TestPackage2.Parent.create();
            // sendMsg.person = people;
            // sendMsg.sComment = "哈哈哈";
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
            let recv_msg = TestPackage2.People.decode(buffer);
            console.log("error: " + recv_msg);
        })

    }

}