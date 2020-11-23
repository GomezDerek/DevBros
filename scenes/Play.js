class Play extends Phaser.Scene {
    constructor() {
        super("gameScene");

        this.attacking = false;
    }

    preload() {
        //set load path 
        this.load.path = "assets/";
        //load character images 
        this.load.image("hero", "protag fill.png");
        this.load.image("skeleman", "skelemen.png");
        this.load.image('dragonGirl', 'dragongirl.png');
        //load the music!
        this.load.audio('fightSong', 'A Duel Against Traitors (Ver.2).mp3');
        //load sound effects 
        this.load.audio("ultimate", "omae wa mou shindeiru NANI.mp3");
        this.load.audio("fart", "fart-01.wav");
    }

    create() {
        //play that funky music white boyyyyyyy
        this.music = this.sound.add('fightSong');
        this.music.play({ 
            loop: true, 
            volume: 0.25
        });

        //sound fx
        this.ultimateAudio = this.sound.add('ultimate');
        this.fartAudio = this.sound.add('fart');

        //spacebar key
        SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //background
        var bgColor = new Phaser.Display.Color(0 , 0, 0);
        var bg = this.add.rectangle(CENTER_X, CENTER_Y, SCREEN_WIDTH, SCREEN_HEIGHT, bgColor.color);
        var battleWindow = this.add.rectangle(0, SCREEN_HEIGHT*(.33), SCREEN_WIDTH, 330, 0xFFFFFF).setOrigin(0,0);

        


        // //set the scene for the cinematic!
        // this.heroCloseUp = this.add.image(-400, -100, "hero").setOrigin(0,0).setScale(.5);
        // heroCloseUp.flipX = true;

        // this.enemyCloseUp = this.add.image(SCREEN_WIDTH/4, 50, "skeleman").setOrigin(0,0).setScale(.5);
        // enemyCloseUp.flipX = true;
        // enemyCloseUp.alpha = 1;


        //attack timing bar 
        var timingBarColor = new Phaser.Display.Color(0, 0, 200);
        this.timingBar = this.add.rectangle(CENTER_X, 100, SCREEN_WIDTH, 50, 0xA2A2AA);
        // //attack timing box
        // var timingBoxColor = new Phaser.Display.Color(250, 250, 250);
        // this.timingBox = this.add.rectangle(CENTER_X, 100, 50, 50, timingBoxColor.color);

        //attack meter's excellence zone
        this.excellenceZone = this.add.rectangle(this.timingBar.width*(9/10), 75, this.timingBar.width/20, 50, 0xFF0000).setOrigin(0,0);

        //attack meter's good zone
        this.goodZone = this.add.rectangle(this.timingBar.width*(8/10), 75, this.timingBar.width/10, 50, 0xF08C2E).setOrigin(0,0);

        //attack meter's ok zone 
        this.okZone = this.add.rectangle(this.timingBar.width*(6/10), 75, this.timingBar.width/5, 50 , 0xF6ED65).setOrigin(0,0);

        //attack timing slider
        var timingSliderColor = new Phaser.Display.Color(0, 0, 0);
        //this.timingSlider = this.add.rectangle(CENTER_X, 100, 50, 50, timingSliderColor.color);
        this.timingSlider = this.add.rectangle(25, 100, 10, 50, 0xFFFFFF);
        this.sliderDirection = "right";
        this.sliderSpeed = 10;

        //attack timing text
        this.timingText = this.add.text(CENTER_X, 10, "", { font: "40px Arial" });
        this.timingText.x -= this.timingText.width/2;

        

        //add our hero into the game!
        this.heroPosition = SCREEN_WIDTH/4;
        this.hero = this.physics.add.sprite(SCREEN_WIDTH/4, SCREEN_HEIGHT*(2/3), "hero").setOrigin(.5,.5).setScale(.1);
        this.hero.flipX = true;


        //add in the enemy
        this.enemy = this.physics.add.sprite(SCREEN_WIDTH*(3/4), SCREEN_HEIGHT*(2/3), "skeleman").setOrigin(.5,.5).setScale(.1);
        this.enemy.flipX = true;

        //this.cinematic();
        console.log(battleWindow.geom.top);
        console.log(battleWindow.geom.top - this.timingBar.geom.bottom);
        console.log(battleWindow)

    }

    update() {
        // if(this.attacking) {
        //     this.slideTimer = this.time.addEvent( {
        //         delay: 10, //ms
        //         callback: () => this.timingSlider.x ++,
        //         loop: true,
        //         callbackScope: game
        //     })
        // }
        // //determine which direction slider moves
        // if( this.sliderDirection == "right" ) {
        //     this.timingSlider.x += this.sliderSpeed; //move slider right
        // }
        // else {
        //     this.timingSlider.x -= this.sliderSpeed; //move slider left
        // }

        // //if slider hits right edge of bar, change its direction 
        // if( this.timingSlider.x >= (SCREEN_WIDTH - this.timingSlider.width) ) {
        //     this.sliderDirection = "left";
        //     this.timingBar.fillColor = 0x0000C8; //reset bar to blue
        //     this.timingText.setText(""); //erase text
        // }
        // //if slider hits left edge of bar, change its direction
        // else if ( this.timingSlider.x <= (0 + this.timingSlider.width) ) {
        //     this.sliderDirection = "right";
        //     this.timingBar.fillColor = 0x0000C8; //reset bar to blue 
        //     this.timingText.setText(""); //erase text
        // }

        //this.accuracy;
        //while spacebar is pressed
        if( Phaser.Input.Keyboard.JustDown(SPACEBAR) ) {
            //record where the slider is when it stops
            //this.accuracy = Math.abs( this.timingSlider.x );

            this.startAttackMeter();
        }
        //when spacebar is released
        if( Phaser.Input.Keyboard.JustUp(SPACEBAR) ) {

            this.finishAttackMeter();

            // console.log(this.accuracy);

            // //player hits spacebar w/in 50 px of timingBox
            // if(this.accuracy < 50) {
            //     this.timingBar.fillColor = 0x6ECE2A; //green
            //     this.timingText.setTint(0x6ECE2A); 
            //     this.timingText.setText("EXCELLENT!");
            //     this.timingText.x = CENTER_X - this.timingText.width/2;
            // }
            // //player hits spacebar w/in 100 px of timingBox
            // else if(this.accuracy < 100) {
            //     this.timingBar.fillColor = 0xFFEF33; //yellow
            //     this.timingText.setTint(0xFFEF33);
            //     this.timingText.setText("Good");
            //     this.timingText.x = CENTER_X - this.timingText.width/2;
            // }
            // //player hits spacebar outside of 100 px
            // else {
            //     this.timingBar.fillColor = 0xFF0000; //red
            //     this.timingText.setTint(0xFF0000);
            //     this.timingText.setText("you suck");
            //     this.timingText.x = CENTER_X - this.timingText.width/2;
            // }
        }
    }


    startAttackMeter() {
        this.attacking = true;

        //make attack meter visible
        this.timingBar.alpha = 1;
        //this.timingBox.alpha = 1;
        this.timingSlider.alpha = 1;
        this.timingText.alpha = 1;
        this.excellenceZone.alpha = 1;
        this.goodZone.alpha = 1;
        this.okZone.alpha = 1;

        //restart slider position at beginning of attack meter
        this.timingSlider.x = this.timingBar.x - this.timingBar.width/2 + this.timingSlider.width/2;

        //start slider 
        this.slideTimer = this.time.addEvent( {
            delay: 1, //ms
            callback: () => this.timingSlider.x += 15,
            loop: true,
            callbackScope: game
        })
        
        //notes: for some reason - the tween's stop() doesn't immediately stop the slider so iy goes a little further
        //than when user hits input 

        // this.sliderTween = this.tweens.add({
        //     targets: this.timingSlider,
        //     x: this.timingBar.x + this.timingBar.width/2 - this.timingSlider.width/2, //stop at end of screen/bar
        //     //delay: 1000,   //wait 1 sec after attack meter appears to start sliding
        //     duration: 800   //ms 
        // });

    }

    finishAttackMeter() {
        this.attacking = false;
        //this.sliderTween.stop(); // stop the slider!
        this.slideTimer.remove(false);
        this.rateAttack();
        //this.hideAttackMeter();

        
    }

    hideAttackMeter() {
        //wait 1.5 sec before hiding attackMeter
        this.endCountdown = this.time.addEvent({
            delay: 1500, //ms
            callback: () => {
                //do all the hiding!
                this.timingBar.alpha = 0;
                //this.timingBox.alpha = 0;
                this.timingSlider.alpha = 0;
                this.timingText.alpha = 0;
                this.timingText.setText("");
                this.excellenceZone.alpha = 0;
                this.goodZone.alpha = 0;
                this.okZone.alpha = 0;
            },
            callbackScope: game
        });
    }

    rateAttack() {
        //slider lands in excellence zone 
        if( this.attackIsExcellent() ) {
            console.log("EXCELLENT!");
            this.timingText.setTint(0xFF0000); 
            this.timingText.setText("DEVASTATING!");
            this.timingText.x = CENTER_X - this.timingText.width/2;

            //this.delay( this.cinematic(), 500 );
            let pauseBeforeMovie = this.time.addEvent({delay: 500 , callback: () => this.cinematic(), callbackScope: game});
            //this.cinematic();
        }

        //slider lands in good zone 
        else if( this.attackIsGood() ) {
            console.log("Good!");
            this.timingText.setTint(0xF08C2E); 
            this.timingText.setText("Deadly!");
            this.timingText.x = CENTER_X - this.timingText.width/2;
        }

        //slider lands in ok zone 
        else if( this.attackIsOk() ) {
            console.log("ok!")
            this.timingText.setTint(0xF6ED65); 
            this.timingText.setText("good!");
            this.timingText.x = CENTER_X - this.timingText.width/2;
        }

        //slider misses
        else {
            console.log("miss :(");
            this.timingText.setTint(0xA2A2AA); 
            this.timingText.setText("miss");
            this.timingText.x = CENTER_X - this.timingText.width/2;

            this.fartAudio.play();
        }
    }

    attackIsExcellent() {
        let leftBound = this.excellenceZone.x;
        let rightBound = leftBound + this.excellenceZone.width;
        return ( this.timingSlider.x >= leftBound 
                            && 
                 this.timingSlider.x <= rightBound 
        );
    }

    attackIsGood() {
        let leftBound = this.goodZone.x;
        let rightBound = leftBound + this.goodZone.width;
        return ( this.timingSlider.x >= leftBound 
                            && 
                 this.timingSlider.x <= rightBound 
        );
    }

    attackIsOk() {
        let leftBound = this.okZone.x;
        let rightBound = leftBound + this.okZone.width;
        return ( this.timingSlider.x >= leftBound 
                            && 
                 this.timingSlider.x <= rightBound 
        );
    }

    cinematic() {
        this.ultimateAudio.play();
        
        let bg = this.add.rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0xFFFFFF).setOrigin(0,0);

        let heroCloseUp = this.add.image(-400, -100, "hero").setOrigin(0,0).setScale(.5);
        heroCloseUp.flipX = true;

        let enemyCloseUp = this.add.image(SCREEN_WIDTH/4, 50, "skeleman").setOrigin(0,0).setScale(.5);
        enemyCloseUp.flipX = true;
        enemyCloseUp.alpha = 0;


        //cinematic widescreen
        let topRectangle = this.add.rectangle(0, 0, SCREEN_WIDTH, 150, 0X000000).setOrigin(0,0);
        let bottomRectangle = this.add.rectangle(0, SCREEN_HEIGHT - 150, SCREEN_WIDTH, 150, 0x000000).setOrigin(0,0);

        this.ultimateAudio.play();

        let heroTween = this.tweens.add({
            targets: heroCloseUp,
            x: -350,
            //delay: 1000,   //wait 1 sec after attack meter appears to start sliding
            duration: 2000   //ms 
        });

        //change close up from hero to enemy
        let cameraSwitch = this.time.addEvent({
            delay: 3000, //ms
            callback: () => {
                heroCloseUp.destroy();
                enemyCloseUp.alpha = 1;
            },
            callbackScope: game
        });     

        //cut away from enemy close up
        let cameraSwitch2 = this.time.addEvent({
            delay: 3700, //ms
            callback: () => {
                enemyCloseUp.destroy();
                bg.fillColor = 0xFF0000;
            },
            callbackScope: game
        })

        let endCinematic = this.time.addEvent({
            delay: 6500, //ms
            callback: () => {
                bg.destroy();
                topRectangle.destroy();
                bottomRectangle.destroy();
            },
            callbackScope: game
        })

    }


    delay(funct, ms) {
        let delayFunct = this.time.addEvent( { delay: ms, callback: () => funct, callbackScope: game } );
    }
        
}