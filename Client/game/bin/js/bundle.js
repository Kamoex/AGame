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
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
