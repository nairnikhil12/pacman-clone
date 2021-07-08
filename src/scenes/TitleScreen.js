import Phaser from "../lib/phaser.js";
import Constants from "../constants.js";
import Button from "../game/Button.js";

export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen');
    }

    init() {

    }

    preload() {

    }

    create() {
        const play_text = new Button('Play', Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 32, this, () => {
            this.scene.start('LevelMenu');
        });
    }

    update() {

    }
};