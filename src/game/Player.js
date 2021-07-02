import Constants from '../constants.js';
import Phaser from '../lib/phaser.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.displayWidth = Constants.BLOCK_WIDTH;
        this.displayHeight = Constants.BLOCK_HEIGHT;
    }

    handleInput(cursors) {
        if(cursors.right.isDown && this.x < Constants.WINDOW_WIDTH) {
            this.setVelocity(Constants.PLAYER_SPEED_X, 0);
        }
        else if(cursors.left.isDown && this.x > 0) {
            this.setVelocity(-Constants.PLAYER_SPEED_X, 0);
        }
        else if(cursors.down.isDown && this.y < Constants.WINDOW_HEIGHT) {
            this.setVelocity(0, Constants.PLAYER_SPEED_Y);
        }
        else if(cursors.up.isDown && this.y > 0) {
            this.setVelocity(0, -Constants.PLAYER_SPEED_Y);
        }

        if(!cursors.right.isDown && !cursors.left.isDown) {
            this.setVelocityX(0);
        }
        if(!cursors.up.isDown && !cursors.down.isDown) {
            this.setVelocityY(0);
        }
    }
}