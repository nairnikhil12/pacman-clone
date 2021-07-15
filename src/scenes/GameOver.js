import Phaser from "../lib/phaser.js";
import Constants from "../constants.js";
import Button from "../game/Button.js";
import { getHighscoreOfLevel, setHighscoreOfLevel } from "../game/Highscore.js";

/***
 * Fileoverview:
 * The game over screen. Displays the final score of the player.
 */

export default class GameOver extends Phaser.Scene {
    game_over_text;
    time_text;
    score;
    has_won;
    level_id;

    constructor() {
        super('GameOver');
    }

    init(config) {
        this.score = config.score;
        this.has_won = config.has_won;
        this.level_id = config.level;
    }

    preload() {

    }

    create() {
        const game_over_string = (this.has_won ? 'You Won' : 'Game Over');

        this.game_over_text = this.add.text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2 - 100, game_over_string, {
            font: "32px sans-serif"
        }).setOrigin(0.5, 0.5);

        if(this.has_won) {
            this.time_text = this.add.text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, `Final Time: ${this.score}`, {
                font: "32px sans-serif"
            }).setOrigin(0.5, 0.5);

            setHighscoreOfLevel(this.level_id, Math.min(this.score, getHighscoreOfLevel(this.level_id) || 1000000000000));

            this.add.text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2 + 35, `Best Time: ${getHighscoreOfLevel(this.level_id)}`, {
                font: "32px sans-serif"
            }).setOrigin(0.5, 0.5);
        }

        const retry = new Button('Retry', Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2 + 100, 32, this, () => {
            this.scene.start('MainGame', { level: this.level_id });
        });

        const level_menu = new Button('Main Menu', Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2 + 150, 32, this, () => {
            this.scene.start('LevelMenu');
        });
    }

    update() {

    }
};