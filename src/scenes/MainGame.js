import Phaser from "../lib/phaser.js";
import Constants from "../constants.js";
import Player from "../game/Player.js";
import Enemy from "../game/Enemy.js";

export default class MainGame extends Phaser.Scene {
    // sprites and groups
    cursors;
    player;
    enemy;
    candies;
    walls;

    level_map;
    score = 0;
    score_text;
    timer_text;
    timed_event;
    max_score;

    constructor() {
        super('MainGame');
    }

    init() {
        this.max_score = 0;
        this.score = 0;
    }

    preload() {
        this.load.image('player', 'assets/images/player.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('wall', 'assets/images/wall.png');
        this.load.json(Constants.LEVEL_ID, `assets/levels/${Constants.LEVEL_ID}.json`);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.level_map = this.cache.json.get(Constants.LEVEL_ID)['layers'][0]['data'];

        console.log(this.level_map);

        this.walls = this.physics.add.staticGroup();
        this.candies = this.physics.add.staticGroup();

        const NUMBER_OF_ROWS = (Constants.WINDOW_HEIGHT / Constants.BLOCK_HEIGHT);
        const NUMBER_OF_COLS = (Constants.WINDOW_WIDTH / Constants.BLOCK_HEIGHT);

        for(let i = 0; i < NUMBER_OF_ROWS; ++i) {
            for(let j = 0; j < NUMBER_OF_COLS; ++j) {
                const index = i * NUMBER_OF_COLS + j;
                const x = j * Constants.BLOCK_WIDTH + 16;
                const y = i * Constants.BLOCK_HEIGHT + 16;

                if(this.level_map[index] == 1) {
                    const wall = this.walls.create(x, y, 'wall');
                    const body = wall.body;
                    body.updateFromGameObject();
                }
                else if(this.level_map[index] == 2) {
                    const candy = this.candies.create(x, y, 'candy');
                    const body = candy.body;
                    body.updateFromGameObject();

                    this.max_score++;
                }
                else if(this.level_map[index] == 3) {
                    this.player = new Player(this, x, y, 'player');
                }
                else if(this.level_map[index] == 4) {
                    this.enemy = new Enemy(this, x, y, 'enemy');
                }
            }
        }

        // score text
        this.score_text = this.add.text(Constants.BLOCK_HEIGHT * 32, Constants.BLOCK_HEIGHT / 2, `Score:${this.score}/${this.max_score}`, {
            font: "32px sans-serif"
        }).setDepth(2);

        // timer events
        this.timed_event = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
        this.timer_text = this.add.text(32, 16, `Time: `, {
            font: "32px sans-serif"
        }).setDepth(2);

        this.physics.add.collider(this.enemy, this.walls);
        this.physics.add.collider(this.player, this.walls);

        this.physics.add.overlap(
            this.player,
            this.enemy,
            this.handleGameOver,
            undefined,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.candies,
            this.handleCandyCollision,
            undefined,
            this
        );
    }

    update() {
        this.player.handleInput(this.cursors);
        this.enemy.update(this.player.x, this.player.y, this.level_map);

        if(this.score == this.max_score) {
            this.handleGameOver();
        }

        this.timer_text.setText('Time: ' + this.timed_event.getElapsedSeconds().toString().substr(0, 4));
    }

    handleGameOver(player, enemy) {
        this.enemy.setVelocity(0, 0);
        this.scene.start('GameOver');
    }

    handleCandyCollision(player, candy) {
        this.score++;
        this.score_text.setText(`Score:${this.score}/${this.max_score}`);
        this.candies.killAndHide(candy);
        this.physics.world.disableBody(candy.body);
    }
};