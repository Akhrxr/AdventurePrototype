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
        this.load.audio('star','assets/starclear.mp3');
    }
    onEnter() {
        let background = this.add.image(-270, this.w * 0,"r32cabin")
            .setScale(2)
            .setOrigin(0,0);
        this.input.on('pointerdown',this.startDrag, this);
        this.gainItem('key');
        this.box = this.add.rectangle(1000,520,75,75)
            .setFillStyle(0xff0000, 0.1);

        this.key = this.add.sprite(1600, 780, "r32key")
            .setScale(0.05)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => {
                this.showMessage("Perfect for starting a car. \nYou should put it in the ignition")

            })
            .on('pointerdown', () => {
                this.showMessage("Put it in the ignition");  
            })
        this.startupsound = this.sound.add("startup");
        this.starsound = this.sound.add("star");
        this.physics.add.existing(this.box);
        this.physics.add.existing(this.key);
        this.clutch = this.input.keyboard.addKey('C');
    }
    update() {
        if(this.physics.overlap(this.box, this.key) & this.clutch.isDown) {
            this.startupsound.play();
            this.gotoScene('fork')
            this.loseItem("key");
        }
        else if (this.physics.overlap(this.box, this.key) & !this.clutch.isDown) {
            this.starsound.play();
            this.showMessage("Hold C to activate the clutch");
        }
    }
}

class Fork extends AdventureScene {
    constructor() {
        super('fork', "Do you go left or right?")
    }
    preload() {
        this.load.image('forkroad',"assets/fork.jpg");
        this.load.image('rear',"assets/r32 rear.png")
    }
    onEnter(){
        this.bounds = this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0,0)
        let background = this.add.image(-200,0, "forkroad")
            .setScale(2.05)
            .setOrigin(0,0);
        this.box = this.add.rectangle(1240,290,400,400)
            .setFillStyle(0xff0000, 0.1);
        this.box2 = this.add.rectangle(200,290,400,400)
            .setFillStyle(0xff0000, 0.1);
        this.r32 = this.physics.add.sprite(this.w/3, this.h -100, "rear") 
            .setScale(0.3)
            .setInteractive()
            .setCollideWorldBounds(true);
        this.physics.add.existing(this.bounds);
        this.physics.add.existing(this.box);
        this.physics.add.existing(this.box2);
        this.physics.add.existing(this.r32);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }
    movementud() {
        if(this.cursorKeys.up.isDown){
            this.r32.y += -3
        }
        else if(this.cursorKeys.down.isDown){
            this.r32.y += 3
        }
    }
    update() {
        if(this.cursorKeys.left.isDown){
            this.r32.x += -3
        }
        else if (!this.physics.collide(this.r32, this.bounds) & this.cursorKeys.right.isDown) {
            this.r32.x += 3
        }
        this.showMessage("Use the arrow keys to go up down left right");
        this.movementud();
        if(this.physics.overlap(this.box, this.r32)) {
            this.gotoScene('garage2');
        }
        if(this.physics.overlap(this.box2, this.r32)) {
            this.gotoScene('fork');
            this.showMessage("nah go right instead")
        }
    }
}
class Garage2 extends AdventureScene {
    constructor() {
        super('garage2', "Pick up your car parts and go home")
    }
    preload(){
        this.load.image('garage2',"assets/r32ingarage.png")
        this.load.image('turbo',"assets/turbo.png")
        this.load.image('wheels',"assets/wheels.png")
        this.load.image('paint',"assets/paintbucket.png")
    }
    onEnter(){
        let background = this.add.image(-135,0, "garage2")
            .setScale(0.75)
            .setOrigin(0,0);
        let turbos = this.add.sprite(800, 120, "turbo")
            .setScale(0.1)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.8)
            .on('pointerover', () => {
                this.showMessage("Perfect for adding power to the car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up a turbocharger");
                this.gainItem('turbos');
                this.tweens.add({
                    targets: turbos,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => turbos.destroy()
                });
            })
        let wheel1 = this.add.sprite(930, 900, "wheels")
            .setScale(0.2)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.9)
            .setRotation(4.5)
            .on('pointerover', () => {
                this.showMessage("Perfect for changing the wheels on a car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up a wheel");
                this.gainItem('wheel1');
                this.tweens.add({
                    targets: wheel1,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wheel1.destroy()
                });
            })
        let wheel2 = this.add.sprite(650, 900, "wheels")
            .setScale(0.2)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.9)
            .setRotation(4.5)
            .on('pointerover', () => {
                this.showMessage("Perfect for changing the wheels on a car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up a wheel");
                this.gainItem('wheel2');
                this.tweens.add({
                    targets: wheel2,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wheel2.destroy()
                });
            })
        let wheel3 = this.add.sprite(740, 900, "wheels")
            .setScale(0.2)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.9)
            .setRotation(4.5)
            .on('pointerover', () => {
                this.showMessage("Perfect for changing the wheels on a car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up a wheel");
                this.gainItem('wheel3');
                this.tweens.add({
                    targets: wheel3,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wheel3.destroy()
                });
            })
        let wheel4 = this.add.sprite(800, 900, "wheels")
            .setScale(0.2)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.9)
            .setRotation(4.5)
            .on('pointerover', () => {
                this.showMessage("Perfect for changing the wheels on a car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up a wheel");
                this.gainItem('wheel4');
                this.tweens.add({
                    targets: wheel4,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wheel4.destroy()
                });
            })
        let paint = this.add.sprite(1300, 300, "paint")
            .setScale(0.1)
            .setInteractive({useHandCursor:true})
            .setAlpha(0.8)
            .on('pointerover', () => {
                this.showMessage("Perfect for changing the paint on a car.")

            })
            .on('pointerdown', () => {
                this.showMessage("*you picked up paint");
                this.gainItem('paint');
                this.tweens.add({
                    targets: paint,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => paint.destroy()
                });
            })
    }
    update(){
        if(this.hasItem("turbos") & this.hasItem("wheel1") & this.hasItem("wheel2") & this.hasItem("wheel3") & this.hasItem("wheel4") & this.hasItem("paint")) {
            this.showMessage("You have it all. Go home")
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('outro'));
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
        this.add.text(50, 50, "Goodbye DK, good work today\nNext time we can have more fun").setFontSize(50);
        this.add.text(200, 600, "Click anywhere to restart.").setFontSize(100);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

var gameSettings = {
    playerSpeed: 150
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Garage2, Garage, Cabin, Fork, Outro],
    title: "Adventure Game",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
});

