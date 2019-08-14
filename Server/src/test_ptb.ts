import { load, Root } from "protobufjs"; // respectively "./node_modules/protobufjs"

export class test_ptb {

    public message: any;
    public AwesomeMessage: any;

    constructor() {

    }

    public initMsg() {
        load("../Common/message/test.proto", (err, root: any) => {
            if (err)
                throw err;
            try {
                this.AwesomeMessage = root.lookupType("TestPackage.TestMessage");
                this.message = this.AwesomeMessage.create({
                    sName: "hello_client",
                    nId: 1001,
                    fWeight: 55.7,
                    bSex: true
                });
        
                console.log(`message = ${JSON.stringify(this.message)}`);
        
                let buffer = this.AwesomeMessage.encode(this.message).finish();
                console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
        
                let decoded = this.AwesomeMessage.decode(buffer);
                console.log(`decoded = ${JSON.stringify(decoded)}`);
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }

    public getMsg(): any {
        this.message = this.AwesomeMessage.create({
            sName: "hello",
            nId: 1001,
            fWeight: 55.7,
            bSex: true
        });

        this.message.sName = "张翮";
        console.log(`message = ${JSON.stringify(this.message)}`);

        let buffer = this.AwesomeMessage.encode(this.message).finish();
        console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

        let decoded = this.AwesomeMessage.decode(buffer);
        console.log(`decoded = ${JSON.stringify(decoded)}`);
    }
}

let ptb: test_ptb = new test_ptb();
ptb.initMsg();