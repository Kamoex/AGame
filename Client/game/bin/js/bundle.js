(function () {
    'use strict';

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class agameUI extends Laya.View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("agame");
            }
        }
        ui.agameUI = agameUI;
        REG("ui.agameUI", agameUI);
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

    class GameUI extends ui.agameUI {
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
            Logger.Info("LoginGame");
        }
        RegistAccount() {
            Laya.Scene.open("regist.scene");
        }
        TryGame() {
            Logger.Info("TryGame");
            Laya.Scene.open("agame.scene");
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
            reg("logic/login/LoginUI.ts", LoginUI);
            reg("logic/login/RegistUI.ts", RegistUI);
        }
    }
    GameConfig.width = 480;
    GameConfig.height = 640;
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

    const SOCKET_IO_CONNECT = "connect";
    const SOCKET_IO_MESSAGE = "message";
    const SOCKET_IO_DISCONNECT = "disconnect";
    const SOCKET_IO_ERROR = "error";
    const SOCKET_IO_CONNECT_ERROR = "connect_error";

    var EMessageID;
    (function (EMessageID) {
        EMessageID[EMessageID["START"] = 0] = "START";
        EMessageID[EMessageID["LGS_START"] = 1] = "LGS_START";
        EMessageID[EMessageID["L2GSConnectSuccess"] = 2] = "L2GSConnectSuccess";
        EMessageID[EMessageID["GS2LConnectAuth"] = 3] = "GS2LConnectAuth";
        EMessageID[EMessageID["L2GSConnectAuth"] = 4] = "L2GSConnectAuth";
        EMessageID[EMessageID["LGS_END"] = 5] = "LGS_END";
        EMessageID[EMessageID["ELC_START"] = 6] = "ELC_START";
        EMessageID[EMessageID["L2CServerInfo"] = 7] = "L2CServerInfo";
        EMessageID[EMessageID["C2LLogin"] = 8] = "C2LLogin";
        EMessageID[EMessageID["L2CLogin"] = 9] = "L2CLogin";
        EMessageID[EMessageID["ELC_END"] = 10] = "ELC_END";
        EMessageID[EMessageID["EGSC_START"] = 11] = "EGSC_START";
        EMessageID[EMessageID["C2GSConnect"] = 12] = "C2GSConnect";
        EMessageID[EMessageID["GS2CConnect"] = 13] = "GS2CConnect";
        EMessageID[EMessageID["EGSC_END"] = 14] = "EGSC_END";
        EMessageID[EMessageID["END"] = 15] = "END";
    })(EMessageID || (EMessageID = {}));

    class MsgHandler {
        constructor() {
            this.messageFun = {};
        }
        static MessageRegist() {
            let props = Reflect.ownKeys(EMessageID);
            for (let i = 1; i <= EMessageID.END; i++) {
                let keyIndex = EMessageID.START + i;
                let nameIndex = EMessageID.END + i + 1;
                let msgName = props[nameIndex].toString();
                let msgKey = parseInt(props[keyIndex].toString());
                this.msgKey2Name[msgKey] = msgName;
                this.msgName2Key[msgName] = msgKey;
            }
        }
        static GetMsgName(msgKey) {
            return this.msgKey2Name[msgKey];
        }
        static GetMsgKey(msgName) {
            return this.msgName2Key[msgName];
        }
        static HandleFromLogin(msg) {
            let msgID = 0;
            try {
                let recvMsg = MsgBase.MessageHead.decode(msg);
                msgID = recvMsg.nMsgID;
                let msgLen = recvMsg.nMsgLength;
                let msgName = MsgHandler.GetMsgName(msgID);
                let msgBody = MsgLC[msgName].decode(recvMsg.data);
                Logger.Info(msgBody);
                this.LoginEvent.event(msgName, msgBody);
            }
            catch (error) {
                console.error(error.stack + msgID);
            }
        }
        static HandleFromGS(msg) {
            let msgID = 0;
            try {
                let recvMsg = MsgBase.MessageHead.decode(msg);
                msgID = recvMsg.nMsgID;
                let msgLen = recvMsg.nMsgLength;
                let msgName = MsgHandler.GetMsgName(msgID);
                let msgBody = MsgGSC[msgName].decode(recvMsg.data);
                this.GSEvent.event(msgName, msgBody);
            }
            catch (error) {
                console.error(error.stack + msgID);
            }
        }
    }
    MsgHandler.LoginEvent = new Laya.EventDispatcher();
    MsgHandler.GSEvent = new Laya.EventDispatcher();
    MsgHandler.msgName2Key = {};
    MsgHandler.msgKey2Name = {};

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
            Laya.loader.load([
                { "url": this.CONNECT_SRV_CFG },
                { "url": "./res/atlas/img.atlas" }
            ], Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
            MsgHandler.MessageRegist();
        }
        onLoaded() {
            this.connectSrvCfg = Laya.Loader.getRes(this.CONNECT_SRV_CFG);
            let conSrv = this.connectSrvCfg.connect_srv;
            this.serverHost = this.connectSrvCfg[conSrv].url + "?token=" + this.connectSrvCfg[conSrv].token;
            this.ConnectLogin();
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
                MsgHandler.HandleFromLogin(buffer);
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

}());
