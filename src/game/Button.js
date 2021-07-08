export default class Button {
    text;

    constructor(str, x, y, font_size, scene, callBack) {
        this.text = scene.add.text(x, y, str, {
            font: `${font_size}px sans-serif`
        }).setOrigin(0.5, 0.5).setInteractive();

        scene.input.on('pointerdown', (pointer) => {
            if(pointer.x < this.text.x - this.text.displayWidth / 2) return ;
            if(pointer.x > this.text.x + this.text.displayWidth / 2) return ;
            if(pointer.y < this.text.y - this.text.displayHeight / 2) return ;
            if(pointer.y > this.text.y + this.text.displayHeight / 2) return ;

            if(callBack)
                callBack();
        });

        scene.input.on('pointerover', (pointer) => {
            if(pointer.x < this.text.x - this.text.displayWidth / 2) return ;
            if(pointer.x > this.text.x + this.text.displayWidth / 2) return ;
            if(pointer.y < this.text.y - this.text.displayHeight / 2) return ;
            if(pointer.y > this.text.y + this.text.displayHeight / 2) return ;

            this.text.setBackgroundColor('#fff');
            this.text.setColor('#000');
        });

        scene.input.on('pointerout', (pointer) => {
            this.text.setBackgroundColor('#000');
            this.text.setColor('#fff');
        });
    }
}