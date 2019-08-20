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

    class TestSocketIO {
        constructor() {
            this.serverHost = "http://127.0.0.1:8001";
            this.connect();
        }
        connect() {
            console.log("开始连接服务器服务器: ");
            this.socket = io.connect(this.serverHost);
            this.socket.on("connect", () => {
                let msg2 = TestPackage.TestMessage.create();
                msg2.sName = "Dad";
                msg2.nId = 21000000009;
                msg2.fWeight = 19.5;
                msg2.bSex = false;
                let bufferSend = new Laya.Byte();
                bufferSend.clear();
                bufferSend.writeArrayBuffer(TestPackage.TestMessage.encode(msg2).finish());
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
                let recv_msg = TestPackage.TestMessage.decode(buffer);
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
