import Constants from '../constants.js';
import Phaser from '../lib/phaser.js';

/***
 * Fileoverview:
 * Implements the logic for updating the player sprite.
 */

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.displayWidth = Constants.BLOCK_WIDTH - 5;
        this.displayHeight = Constants.BLOCK_HEIGHT - 5;
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