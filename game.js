class Garage extends AdventureScene {
    constructor() {
        super("garage", "Grab your keys and your wheel, we bouta slide.");
    }
    preload(){
        this.load.image('r32key',"assets/r32key.png");
        this.load.image('swheel',"assets/steeringwheel.png");
        this.load.image('r32car',"assets/r32white.png");
        this.load.image('backgrounds',"assets/garage.jpg");
    }
    onEnter() {
        let background = this.add.image(-475, this.w * 0,"backgrounds")
            .setScale(2)
            .setOrigin(0,0);

        let wheel = this.add.sprite(this.w * 0.2, this.w * 0.1, "swheel")
            .setScale(0.2)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => this.showMessage("Nice n grippy."))
            .on('pointerdown', () => {
                this.showMessage("You pick up the wheel.");
                this.gainItem('wheel');
                this.tweens.add({
                    targets: wheel,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wheel.destroy()
                });
            });

        let key = this.add.sprite(this.w * 0.7, this.w * 0.25, "r32key")
            .setScale(0.05)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => {
                this.showMessage("Perfect for starting a car")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let r32 = this.add.sprite(this.w * 0.4, this.w * 0.4, "r32car")
            .setInteractive({useHandCursor:true})
            .setScale(1.25)
            .on('pointerover', () => {
                if (this.hasItem("key") & this.hasItem("wheel")) {
                    this.showMessage("You've got the key and wheel for the car.");
                } else if (this.hasItem("key") & !this.hasItem("wheel")) {
                    this.showMessage("You've got the key, but no wheel");
                }
                else {
                    this.showMessage("You can't enter, get the key.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key") & this.hasItem("wheel")) {
                    this.loseItem("wheel");
                    this.showMessage("*you entered*");
                    this.gotoScene('cabin');
                    this.tweens.add({
                        targets: r32,
                        alpha: { from: 1, to: 0 },
                        duration: 1500,
                        onComplete: () => r32.destroy()
                    });                
                }
            })

    }
}

class Cabin extends AdventureScene {
    constructor() {
        super("cabin", "Time to turn on the car");
    }
    preload() {
        this.load.image('r32cabin',"assets/r32cabin.jpg");
        this.load.image('r32key',"assets/r32key.png");
        this.load.audio('startup', 'assets/startupgtr.mp3');
    }
    onEnter() {
        let background = this.add.image(-270, this.w * 0,"r32cabin")
            .setScale(2)
            .setOrigin(0,0);
        this.input.on('pointerdown',this.startDrag, this);
        this.gainItem('key');
        let box = this.add.rectangle(1000,520,75,75)
            .setFillStyle(0xff0000, 1);

        let key = this.add.sprite(1600, 780, "r32key")
            .setScale(0.05)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => {
                this.showMessage("Perfect for starting a car. \nYou should put it in the ignition")

            })
            .on('pointerdown', () => {
                this.showMessage("Put it in the ignition");  
            })

        this.physics.add.overlap(key, box, function () {
            inZone = true;
        });
        var clutch = scene.input.keyboard.addKey('C');
        this.startupsound = this.sound.add("startup");
    }
    update() {
        if (inZone && this.input.activePointer.isDown && clutch.isDown) {
            
        }
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload(){
        this.load.image('r32int', 'assets/r32.jpg');
    }
    create() {
        this.background = this.add.image(0,0, "r32int");
        this.background.setOrigin(0,0);
        this.background.setScale(3.2);
        this.add.text(50,50, "Welcome back DK").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('garage'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "Goodbye DK, good work today").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Cabin, Intro, Garage, Outro],
    title: "Adventure Game",
});

