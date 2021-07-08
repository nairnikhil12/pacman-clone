import Phaser from "../lib/phaser.js";
import Constants from "../constants.js";

export default class GameOver extends Phaser.Scene {
    game_over_text;

    constructor() {
        super('GameOver');
    }

    init() {

    }

    preload() {

    }

    create() {
        this.game_over_text = this.add.text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, `Game Over!`, {
            font: "32px sans-serif"
        }).setOrigin(0.5, 0.5);
    }

    update() {

    }
};