(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    var ELGSMessageID;
    (function (ELGSMessageID) {
        ELGSMessageID[ELGSMessageID["ELGSNull"] = 0] = "ELGSNull";
        ELGSMessageID[ELGSMessageID["ELGSEnd"] = 1] = "ELGSEnd";
    })(ELGSMessageID || (ELGSMessageID = {}));
    var ELCMessageID;
    (function (ELCMessageID) {
        ELCMessageID[ELCMessageID["ELCNull"] = 1] = "ELCNull";
        ELCMessageID[ELCMessageID["C2LLogin"] = 2] = "C2LLogin";
        ELCMessageID[ELCMessageID["L2CLogin"] = 3] = "L2CLogin";
        ELCMessageID[ELCMessageID["ELCEnd"] = 4] = "ELCEnd";
    })(ELCMessageID || (ELCMessageID = {}));
    var EGSCMessageID;
    (function (EGSCMessageID) {
        EGSCMessageID[EGSCMessageID["EGSCNull"] = 4] = "EGSCNull";
        EGSCMessageID[EGSCMessageID["EGSCMsgEnd"] = 5] = "EGSCMsgEnd";
    })(EGSCMessageID || (EGSCMessageID = {}));

    class TestSocketIO {
        constructor() {
            this.serverHost = "http://127.0.0.1:8001";
            this.connect();
        }
        connect() {
            console.log("开始连接服务器服务器: ");
            let msg2222 = MsgCS.C2LLogin.create();
            this.socket = io.connect(this.serverHost);
            this.socket.on("connect", () => {
                let head = MsgBase.MessageHead.create();
                head.nMsgID = ELCMessageID.C2LLogin;
                let msg = MsgCS.C2LLogin.create();
                msg.sAccount = "inuyashazh";
                msg.sPassword = "123456";
                head.data = MsgCS.C2LLogin.encode(msg).finish();
                head.nMsgLength = head.data.length;
                let bufferSend = new Laya.Byte();
                bufferSend.clear();
                bufferSend.writeArrayBuffer(MsgBase.MessageHead.encode(head).finish());
                this.socket.compress(true);
                this.socket.send(bufferSend.buffer);
            });
            this.socket.on("disconnect", (e) => {
                console.log("disconnect: " + e);
                this.socket.close();
            });
            this.socket.on("error", (e) => {
                console.log("error: " + e);
            });
            this.socket.on("message", (message) => {
                let bufferSend = new Laya.Byte();
                bufferSend.writeArrayBuffer(message);
                let buffer = new Uint8Array(bufferSend.buffer);
                let recv_msg = MsgCS.L2CLogin.decode(buffer);
                console.log("error: " + recv_msg);
            });
        }
    }

    var Browser = Laya.Browser;
    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
            let ProtoBuf = Browser.window.protobuf;
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();
    new TestSocketIO();

}());
