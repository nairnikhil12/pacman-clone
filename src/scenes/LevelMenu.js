import Phaser from "../lib/phaser.js";
import Constants from "../constants.js";
import Button from "../game/Button.js";

export default class LevelMenu extends Phaser.Scene {
    level_images;
    level_name_text;
    current_level;
    next_button;
    prev_button;

    is_called;

    constructor() {
        super('LevelMenu');
    }

    init() {
        this.current_level = 1;
        this.is_called = false;
    }

    preload() {
        for(let i = 1; i <= Constants.NUMBER_OF_LEVELS; ++i) {
            this.load.image(`level${i}`, `assets/levels/level${i}.png`);
        }
    }

    create() {
        const X = 270;
        const Y = 150;
        const IMAGE_WIDTH = 700;
        const IMAGE_HEIGHT = 300;

        this.level_images = [null];
        for(let i = 1; i <= Constants.NUMBER_OF_LEVELS; ++i) {
            const image = this.add.image(X, Y, `level${i}`).setOrigin(0, 0);
            image.displayWidth = IMAGE_WIDTH;
            image.displayHeight = IMAGE_HEIGHT;
            image.setActive(false).setVisible(false);

            this.input.on('pointerdown', (pointer) => {
                // to avoid calling this.scene.start multiple times
                if(this.is_called) return ;
                if(pointer.x < image.x) return ;
                if(pointer.x > image.x + image.displayWidth) return ;
                if(pointer.y < image.y) return ;
                if(pointer.y > image.y + image.displayHeight) return ;

                const LEVEL_ID = `level${this.current_level}`;
                this.scene.start('MainGame', {level: LEVEL_ID});

                this.is_called = true;
            });

            this.level_images.push(image);
        }

        this.next_button = new Button("Next", Constants.WINDOW_WIDTH - 50, Constants.WINDOW_HEIGHT / 2, 32, this, () => {
            this.goToNextLevel();
        });
        this.prev_button = new Button("Prev", 50, Constants.WINDOW_HEIGHT / 2, 32, this, () => {
            this.goToPreviousLevel();
        });

        this.level_images[this.current_level].setActive(true).setVisible(true);

        this.level_name_text = this.add.text(Constants.WINDOW_WIDTH / 2, 32, `Level ${this.current_level}`, {
            font: "32px sans-serif"
        }).setOrigin(0.5, 0.5);
    }

    update() {

    }

    goToNextLevel() {
        if(this.current_level + 1 > Constants.NUMBER_OF_LEVELS)
            return ;

        this.level_images[this.current_level].setActive(false).setVisible(false);
        this.current_level += 1;
        this.level_images[this.current_level].setActive(true).setVisible(true);

        this.level_name_text.setText(`Level ${this.current_level}`);
    }

    goToPreviousLevel() {
        if(this.current_level - 1 < 1)
            return ;

        this.level_images[this.current_level].setActive(false).setVisible(false);
        this.current_level -= 1;
        this.level_images[this.current_level].setActive(true).setVisible(true);

        this.level_name_text.setText(`Level ${this.current_level}`);
    }
};