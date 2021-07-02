import Constants from '../constants.js';
import Phaser from '../lib/phaser.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.displayWidth = Constants.BLOCK_WIDTH;
        this.displayHeight = Constants.BLOCK_HEIGHT;
    }

    update(player_x, player_y, level_map) {
        const move_x = (player_x == this.x ? 0 : (player_x - this.x) / Math.abs(player_x - this.x));
        const move_y = (player_y == this.y ? 0 : (player_y - this.y) / Math.abs(player_y - this.y));

        this.setVelocity(move_x * Constants.PLAYER_SPEED_X / 2, move_y * Constants.PLAYER_SPEED_Y / 2);
    }
}