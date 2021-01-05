class Move extends Phaser.Scene {
    constructor() {
        super("moveScene");

    }

    preload() {
        //set load path 
        this.load.path = "assets/";

        this.load.spritesheet("walk", "animations/walky 4x3 binary.png", 
            {
            frameWidth: 2048, 
            frameHeight: 2048, 
            startFrame: 0, 
            endFrame: 11
            }
        );

        // this.load.spritesheet("idle", "animations/idle 8x3 binary.png",
        //     {
        //         framwWidth: 2048,
        //         frameHeight: 2048,
        //         startFrame: 0,
        //         endFrame: 25
        //     }
        // );

        //load music
        this.load.audio('bgMusic', 'audio/Town.mp3');

    }

    create() {
        //input keys
        SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        RIGHTKEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        LEFTKEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        UPKEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        DOWNKEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        A_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        S_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        W_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        D_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        //background
        var bgColor = new Phaser.Display.Color(27, 99, 63);
        var bg = this.add.rectangle(CENTER_X, CENTER_Y, SCREEN_WIDTH, SCREEN_HEIGHT, bgColor.color);
        //var battleWindow = this.add.rectangle(0, SCREEN_HEIGHT*(.33), SCREEN_WIDTH, 330, 0xFFFFFF).setOrigin(0,0);

        //play that funky music white boyyyyyyy
        this.music = this.sound.add('bgMusic');
        this.music.play({ 
            loop: true, 
            volume: 0.25
        });

        /////////////////////////////
        //animation workspace! 
        ///////////////////////////

        //temporary protagonist

        // this.tempProtag = this.physics.add.sprite(CENTER_X, CENTER_Y, "walk", 0 ).setScale(.1);


        // //animation config for dragonGirl
        // this.anims.create({
        //     key: 'fly',
        //     frames: this.anims.generateFrameNumbers('walk', {start: 0, end: 11, first:0}),
        //     frameRate: 20,
        //     repeat: -1 //loop forever
        // });

        // //animate!
        // this.tempProtag.anims.play("fly", true);

        this.protag = new Protagonist(this, CENTER_X/2, CENTER_Y);

        //animation config for walking
        this.anims.create({
            key: 'walkAnim',
            frames: this.anims.generateFrameNumbers('walk', {start: 0, end: 11, first:0}),
            frameRate: 30//,
            //repeat: -1 //loop forevver
        });
        //this.protag.anims.play("walkAnim");



        //this.protag2 = new Protagonist(this, CENTER_X*(3/4), CENTER_Y);

        // //animation config for idling
        // this.anims.create({
        //     key: "idleAnim",
        //     frames: this.anims.generateFrameNumbers("idle", {start: 0, end: 25, first: 0}),
        //     frameRate: 30, 
        //     repeat: -1 //loop forever
        // })
        // this.protag2.anims.play("idleAnim");


        this.topBound = 0 + this.protag.displayHeight/2;
        
        this.exitText = this.add.text(20, SCREEN_HEIGHT- 60, "Use WASD or arrow keys to move!\nPress [SPACE] to start a fight!", {font: "20px Arial"});

    }

    update() {


        //while spacebar is pressed
        if( Phaser.Input.Keyboard.JustDown(SPACEBAR) ) {
            this.music.stop();
            this.scene.start("gameScene");
        }

        this.inTopBound = this.protag.y >= this.topBound;


        //Player Movement
        if (RIGHTKEY.isDown || D_KEY.isDown) {
            this.protag.x += 3;
            this.protag.flipX = false;
        }

        if (LEFTKEY.isDown || A_KEY.isDown) {
            this.protag.x -= 3;
            this.protag.flipX = true;
        }

        if (UPKEY.isDown || W_KEY.isDown) {
            this.protag.y -= 3;
            // console.log("player: " + this.protag.y);
            // console.log("topBound: " + this.topBound);
            // console.log("player w/in bound: " + this.inTopBound);
        }
        if(DOWNKEY.isDown || S_KEY.isDown) {
            this.protag.y += 3;
        }

        //Walking animation stops when player is not moving
        if (RIGHTKEY.isDown || D_KEY.isDown || LEFTKEY.isDown || A_KEY.isDown || UPKEY.isDown || W_KEY.isDown || DOWNKEY.isDown || S_KEY.isDown) {
            this.protag.anims.play("walkAnim", true);
        }

        else {
            this.protag.anims.pause();
        }
 

    }

    delay(funct, ms) {
        let delayFunct = this.time.addEvent( { delay: ms, callback: () => funct, callbackScope: game } );
    }
}