import { ui } from "../ui/layaMaxUI";

export default class GameUI extends ui.gameUI {
    static instance: GameUI = null;
    constructor() {
        super();
        GameUI.instance = this;
    }

    onEnable() {
        this.back_login.on(Laya.Event.CLICK, this, this.Back2Login);
    }

    private Back2Login() {
        Laya.Scene.open("login.scene");
    }
}