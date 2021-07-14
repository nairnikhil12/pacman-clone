import Constants from '../constants.js';
import Phaser from '../lib/phaser.js';

/***
 * Fileoverview:
 * Implements the logic for updating the enemy sprite.
 */

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    prev_x;
    prev_y;
    stuck_factor;

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.stuck_factor = 0;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.displayWidth = Constants.BLOCK_WIDTH;
        this.displayHeight = Constants.BLOCK_HEIGHT;
    }

    update(_player_x, _player_y, level_map) {
        let enemy_y = Math.floor(this.x / Constants.BLOCK_WIDTH);
        let enemy_x = Math.floor(this.y / Constants.BLOCK_HEIGHT);
        let player_y = Math.floor(_player_x / Constants.BLOCK_WIDTH);
        let player_x = Math.floor(_player_y / Constants.BLOCK_HEIGHT);

        let queue = [ [enemy_x, enemy_y, 0, 0] ]
        let visited = [];

        const NUMBER_OF_COLS = Math.floor(Constants.WINDOW_WIDTH / Constants.BLOCK_WIDTH);

        let move_x = 0;
        let move_y = 0;

        let counter = 0;
        // do a Breadth-First Search to find the shortest path to the player sprite
        while(queue.length > 0 && counter++ < 10000) {
            let x = queue[0][0];
            let y = queue[0][1];
            let orig_x = queue[0][2];
            let orig_y = queue[0][3];

            queue.shift();

            if(x == player_x && y == player_y) {
                move_x = orig_x;
                move_y = orig_y;
                break;
            }

            const HASH = x * NUMBER_OF_COLS + y;
            if(!visited.find((val) => {return val == HASH})) {
                visited.push(HASH);

                for(let i = -1; i <= 1; ++i) {
                    for(let j = -1; j <= 1; ++j) {
                        if(i == j) continue;
                        const dx = i + x;
                        const dy = j + y;

                        if(dx >= 19 || dy >= 40) continue;
                        if(dx < 0 || dy < 0) continue;
                        // avoid walls
                        if(level_map[dx * NUMBER_OF_COLS + dy] === 1) continue;

                        if(x == enemy_x && y == enemy_y)
                            queue.push([ dx, dy, dx, dy ]);
                        else
                            queue.push([ dx, dy, orig_x, orig_y ]);
                    }
                }
            }
        }

        if(Math.abs(move_x - enemy_x) > Math.abs(move_y - enemy_y)) {
            this.setVelocity(0, ((move_x - enemy_x) / Math.abs(move_x - enemy_x)) * Constants.PLAYER_SPEED_X / 2.25);
        }
        else {
            this.setVelocity(((move_y - enemy_y) / Math.abs(move_y - enemy_y)) * Constants.PLAYER_SPEED_Y / 2.25, 0);
        }

        if(this.prev_x == this.x && this.prev_y == this.y)
            this.stuck_factor++;
        else
            this.stuck_factor = 0;

        if(this.stuck_factor > 10) {
            this.setVelocity(Constants.PLAYER_SPEED_X, Constants.PLAYER_SPEED_Y);
        }

        this.prev_x = this.x;
        this.prev_y = this.y;
    }
}