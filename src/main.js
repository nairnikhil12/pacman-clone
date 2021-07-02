import Phaser from './lib/phaser.js';
import MainGame from './scenes/MainGame.js';
import Constants from './constants.js';

const config = {
    type: Phaser.AUTO,
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT,
    scene: [ MainGame ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);