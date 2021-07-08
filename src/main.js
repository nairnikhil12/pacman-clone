import Phaser from './lib/phaser.js';
import MainGame from './scenes/MainGame.js';
import GameOver from './scenes/GameOver.js';
import LevelMenu from './scenes/LevelMenu.js';
import TitleScreen from './scenes/TitleScreen.js';
import Constants from './constants.js';

const config = {
    type: Phaser.AUTO,
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT,
    scene: [ TitleScreen, LevelMenu, MainGame, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);