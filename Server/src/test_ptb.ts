
import { load, Root } from "protobufjs"; // respectively "./node_modules/protobufjs"
// /// <reference path="../../Common/message/message_bundles/message_bundles.d.ts" />
// import * as msg from "../../Common/message/message_bundles/message_bundles";

export class test_ptb {

    public message: any;
    public message2: any;
    public msg_proto1: any;
    public msg_proto2: any; // 收到的


    constructor() {
        // let test: any = msg.TestPackage.TestMessage.create();
        // test.sName = "SB";
        // test.nId = 1234;
        // test.fWeight = 12.34;
        // test.bSex = true;

        this.initMsg();
    }

    public initMsg() {
        load("../Common/message/test.proto", (err, root: any) => {
            if (err)
                throw err;
            try {
                this.msg_proto1 = root.lookupType("TestPackage.TestMessage");
                this.message = this.msg_proto1.create({
                    sName: "hello_client",
                    nId: 21000000009,
                    fWeight: 55.7,
                    bSex: true
                });

                console.log(`load complete!!! message_test1 = ${JSON.stringify(this.message)}`);

                let buffer = this.msg_proto1.encode(this.message).finish();
                console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

                let decoded = this.msg_proto1.decode(buffer);
                console.log(`decoded = ${JSON.stringify(decoded)}`);

                console.log('');
            } catch (error) {
                console.log(error);
                throw error;
            }
        });

        load("../Common/message/test2.proto", (err, root: any) => {
            if (err)
                throw err;
            try {
                this.msg_proto2 = root.lookupType("TestPackage2.People");
                this.message2 = this.msg_proto2.create();
                // this.message2.sName = "Dad";
                // this.message2.nAge = 60;
                // this.message2.PeopleType = this.msg_proto2.People.eTypes.e_Dad;

                console.log(`load complete!!! message_test2 = ${JSON.stringify(this.message2)}`);

                let buffer = this.msg_proto2.encode(this.message2).finish();
                console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

                let decoded = this.msg_proto2.decode(buffer);
                console.log(`decoded = ${JSON.stringify(decoded)}`);

                console.log('');
            } catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
