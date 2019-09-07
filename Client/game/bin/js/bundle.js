(function () {
    'use strict';

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class gameUI extends Laya.View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("game");
            }
        }
        ui.gameUI = gameUI;
        REG("ui.gameUI", gameUI);
        class loginUI extends Laya.View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("login");
            }
        }
        ui.loginUI = loginUI;
        REG("ui.loginUI", loginUI);
        class registUI extends Laya.View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("regist");
            }
        }
        ui.registUI = registUI;
        REG("ui.registUI", registUI);
    })(ui || (ui = {}));

    class GameUI extends ui.gameUI {
        constructor() {
            super();
            GameUI.instance = this;
        }
        onEnable() {
            this.back_login.on(Laya.Event.CLICK, this, this.Back2Login);
        }
        Back2Login() {
            Laya.Scene.open("login.scene");
        }
    }
    GameUI.instance = null;

    class Logger {
        static Error(str, ...optionalParams) {
            optionalParams.push(new Error().stack);
            console.error(str, ...optionalParams);
        }
        static Trace(str, ...optionalParams) {
            console.trace(str, ...optionalParams);
        }
        static Debug(str, ...optionalParams) {
            console.debug('%c' + str, 'color:green', ...optionalParams);
        }
        static Warn(str, ...optionalParams) {
            console.warn('%c' + str, 'color:#37aaf1', ...optionalParams);
        }
        static Info(str, ...optionalParams) {
            console.log(str, ...optionalParams);
        }
    }

    const SOCKET_IO_CONNECT = "connect";
    const SOCKET_IO_FIRST_MSG = "first_msg";
    const SOCKET_IO_MESSAGE = "message";
    const SOCKET_IO_DISCONNECT = "disconnect";
    const SOCKET_IO_ERROR = "error";
    const SOCKET_IO_CONNECT_ERROR = "connect_error";

    var ELGSMessageID;
    (function (ELGSMessageID) {
        ELGSMessageID[ELGSMessageID["START"] = 0] = "START";
        ELGSMessageID[ELGSMessageID["GS2LConnectAuth"] = 1] = "GS2LConnectAuth";
        ELGSMessageID[ELGSMessageID["L2GSConnectAuth"] = 2] = "L2GSConnectAuth";
        ELGSMessageID[ELGSMessageID["END"] = 3] = "END";
    })(ELGSMessageID || (ELGSMessageID = {}));
    var ELCMessageID;
    (function (ELCMessageID) {
        ELCMessageID[ELCMessageID["START"] = 3] = "START";
        ELCMessageID[ELCMessageID["L2CServerInfo"] = 4] = "L2CServerInfo";
        ELCMessageID[ELCMessageID["C2LLogin"] = 5] = "C2LLogin";
        ELCMessageID[ELCMessageID["L2CLogin"] = 6] = "L2CLogin";
        ELCMessageID[ELCMessageID["END"] = 7] = "END";
    })(ELCMessageID || (ELCMessageID = {}));
    var EGSCMessageID;
    (function (EGSCMessageID) {
        EGSCMessageID[EGSCMessageID["START"] = 7] = "START";
        EGSCMessageID[EGSCMessageID["C2GSConnect"] = 8] = "C2GSConnect";
        EGSCMessageID[EGSCMessageID["GS2CConnect"] = 9] = "GS2CConnect";
        EGSCMessageID[EGSCMessageID["END"] = 10] = "END";
    })(EGSCMessageID || (EGSCMessageID = {}));

    class MsgHandler {
        constructor() {
            this.msgName2Key = {};
            this.msgKey2Name = {};
            this.messageFun = {};
        }
        MessageRegist() { }
        GetMsgName(msgKey) {
            return this.msgKey2Name[msgKey];
        }
        GetMsgKey(msgName) {
            return this.msgName2Key[msgName];
        }
        MessageHandle(recvData) { }
    }

    class LCMsgHandler extends MsgHandler {
        constructor() { super(); }
        static GetInstance() {
            if (!LCMsgHandler.ins)
                LCMsgHandler.ins = new LCMsgHandler();
            return LCMsgHandler.ins;
        }
        MessageRegist() {
            let props = Reflect.ownKeys(ELCMessageID);
            for (let i = 0; i <= LCMsgHandler.msgNum; i++) {
                let index = LCMsgHandler.msgNum + 1 + i;
                let msgName = props[index].toString();
                let msgKey = parseInt(props[i].toString());
                this.msgKey2Name[msgKey] = msgName;
                this.msgName2Key[msgName] = msgKey;
            }
            this.messageFun[ELCMessageID.L2CLogin] = this.HandleL2CLogin;
            console.log("LCMsgHandler MessageRegist success!");
        }
        MessageHandle(recvData) {
            let recvMsg = MsgBase.MessageHead.decode(recvData);
            let msgID = recvMsg.nMsgID;
            let msgLen = recvMsg.nMsgLength;
            let msgName = this.GetMsgName(msgID);
            let msgBody = MsgLC[msgName].decode(recvMsg.data);
            this.messageFun[msgID](msgBody);
        }
        HandleL2CLogin(msg) {
            console.log("handle msg!!!");
        }
    }
    LCMsgHandler.msgNum = ELCMessageID.END - ELCMessageID.START;
    LCMsgHandler.ins = null;

    class LoginLogic {
        constructor() {
            this.CONNECT_SRV_CFG = "ConnectSrvCfg.json";
            this.connected = false;
        }
        static GetInstance() {
            if (!LoginLogic.ins)
                LoginLogic.ins = new LoginLogic();
            return LoginLogic.ins;
        }
        Init() {
            LCMsgHandler.GetInstance().MessageRegist();
            this.serverHost = "http://127.0.0.1:8001?token=tempToken";
        }
        ConnectLogin() {
            Logger.Info("开始连接服务器服务器: " + this.serverHost);
            try {
                this.socketIO = io.connect(this.serverHost);
                this.socketIO.on(SOCKET_IO_CONNECT, this.OnConnect.bind(this));
                this.socketIO.on(SOCKET_IO_MESSAGE, this.OnRecv.bind(this));
                this.socketIO.on(SOCKET_IO_DISCONNECT, this.OnDisConnect.bind(this));
                this.socketIO.on(SOCKET_IO_ERROR, this.OnError.bind(this));
                this.socketIO.on(SOCKET_IO_CONNECT_ERROR, this.OnConnectError.bind(this));
            }
            catch (error) {
                Logger.Info("Session connect err!!!", error.stack);
                debugger;
            }
        }
        OnConnect() {
            Logger.Info("连接服务器成功: " + this.serverHost);
            this.SetConnect(true);
            this.socketIO.emit(SOCKET_IO_FIRST_MSG);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
        OnRecv(recvData) {
            let msgID = 0;
            try {
                let buffer = new Uint8Array(recvData);
                let msg2 = MsgLC.L2CServerInfo.decode(buffer);
                LCMsgHandler.GetInstance().MessageHandle(recvData);
            }
            catch (error) {
                this.socketIO.close();
                Logger.Error('ClientSession OnRecv Error!!! msgID: ' + msgID, error);
            }
        }
        OnDisConnect(info) {
            try {
                Logger.Info("ClientSession disConnect!!!", info);
                this.socketIO.close();
            }
            catch (error) {
                this.socketIO.close();
                Logger.Warn(info, error);
            }
            this.SetConnect(false);
        }
        OnConnectError(e) {
            try {
                this.socketIO.close();
                Logger.Error("ClientSession connect_error!!!", e);
            }
            catch (error) {
                this.socketIO.close();
                Logger.Error(e, error);
            }
            this.SetConnect(false);
        }
        OnError(e) {
            try {
                this.socketIO.close();
                Logger.Error("ClientSession error!!!", e);
            }
            catch (error) {
                this.socketIO.close();
                Logger.Error(e, error);
            }
            this.SetConnect(false);
        }
        Send(data) {
            try {
                this.socketIO.send(data);
            }
            catch (error) {
                this.socketIO.close();
                Logger.Error(data, error);
            }
        }
        SetConnect(state) {
            this.connected = state;
        }
        IsConnect() {
            return this.connected;
        }
    }
    LoginLogic.ins = null;

    class LoginUI extends ui.loginUI {
        constructor() {
            super();
            LoginUI.instance = this;
        }
        onEnable() {
            this.btn_login.on(Laya.Event.CLICK, this, this.LoginGame);
            this.btn_regist.on(Laya.Event.CLICK, this, this.RegistAccount);
            this.btn_try.on(Laya.Event.CLICK, this, this.TryGame);
        }
        LoginGame() {
            console.log("login");
            LoginLogic.GetInstance().ConnectLogin();
        }
        RegistAccount() {
            Laya.Scene.open("regist.scene");
        }
        TryGame() {
            Laya.Scene.open("game.scene");
        }
    }
    LoginUI.instance = null;

    class RegistUI extends ui.registUI {
        constructor() {
            super();
            RegistUI.instance = this;
        }
        onEnable() {
            this.btn_reg_confirm.on(Laya.Event.CLICK, this, this.RegistConfirm);
            this.btn_back_login.on(Laya.Event.CLICK, this, this.Back2Login);
        }
        Back2Login() {
            Laya.Scene.open("login.scene");
        }
        RegistConfirm() {
            console.log("register");
        }
    }
    RegistUI.instance = null;

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("logic/GameUI.ts", GameUI);
            reg("logic/LoginUI.ts", LoginUI);
            reg("logic/RegistUI.ts", RegistUI);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "login.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

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
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();
    LoginLogic.GetInstance().Init();
    LoginLogic.GetInstance().ConnectLogin();

}());
