import { ui } from "../ui/layaMaxUI";

export default class RegistUI extends ui.registUI {
    static instance: RegistUI = null;
    constructor() {
        super();
        RegistUI.instance = this;
    }

    onEnable() {
        this.btn_reg_confirm.on(Laya.Event.CLICK, this, this.RegistConfirm);
        this.btn_back_login.on(Laya.Event.CLICK, this, this.Back2Login);
    }

    private Back2Login() {
        Laya.Scene.open("login.scene");
    }

    private RegistConfirm() {
        console.log("register");
    }
}