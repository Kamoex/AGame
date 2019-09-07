import { ui } from "../../ui/layaMaxUI";
import { LoginLogic } from "./LoginLogic";

export default class LoginUI extends ui.loginUI {
    static instance: LoginUI = null;
    constructor() {
        super();
        LoginUI.instance = this;
    }

    onEnable() {
        this.btn_login.on(Laya.Event.CLICK, this, this.LoginGame);
        this.btn_regist.on(Laya.Event.CLICK, this, this.RegistAccount);
        this.btn_try.on(Laya.Event.CLICK, this, this.TryGame);
    }

    private LoginGame() {
        console.log("login");
        LoginLogic.GetInstance().ConnectLogin();
    }

    private RegistAccount() {
        Laya.Scene.open("regist.scene");
    }

    private TryGame() {
        Laya.Scene.open("game.scene");
    }

}