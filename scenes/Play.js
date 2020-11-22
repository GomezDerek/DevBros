class Play extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }

    preload() {
        //set load path 
        this.load.path = "assets/";
        //load character images 
        this.load.image("hero", "protag fill.png");
        this.load.image("skeleman", "skelemen.png");
        this.load.image('dragonGirl', 'dragongirl.png');
    }

    create() {
        //spacebar key
        SPACE_BAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //background
        var bgColor = new Phaser.Display.Color(0, 0, 0);
        var bg = this.add.rectangle(CENTER_X, CENTER_Y, SCREEN_WIDTH, SCREEN_HEIGHT, bgColor.color);
        
        //add our hero into the game!
        this.hero = this.physics.add.sprite(SCREEN_WIDTH/4, SCREEN_HEIGHT*(2/3), "hero").setOrigin(.5,.5).setScale(.1);
        this.hero.flipX = true;

        //add in the enemy
        this.enemy = this.physics.add.sprite(SCREEN_WIDTH*(3/4), SCREEN_HEIGHT*(2/3), "skeleman").setOrigin(.5,.5).setScale(.1);
        this.enemy.flipX = true;

        //attack timing bar 
        var timingBarColor = new Phaser.Display.Color(0, 0, 200);
        this.timingBar = this.add.rectangle(CENTER_X, 100, SCREEN_WIDTH, 50, timingBarColor.color);
        //attack timing box
        var timingBoxColor = new Phaser.Display.Color(250, 250, 250);
        this.timingBox = this.add.rectangle(CENTER_X, 100, 50, 50, timingBoxColor.color);
        //attack timing slider
        var timingSliderColor = new Phaser.Display.Color(0, 0, 0);
        this.timingSlider = this.add.rectangle(CENTER_X, 100, 50, 50, timingSliderColor.color);
        this.sliderDirection = "right";
        this.sliderSpeed = 10;

        //attack timing text
        this.timingText = this.add.text(CENTER_X, 10, "", { font: "40px Arial" });
        this.timingText.x -= this.timingText.width/2;
    }

    update() {
        //determine which direction slider moves
        if( this.sliderDirection == "right" ) {
            this.timingSlider.x += this.sliderSpeed; //move slider right
        }
        else {
            this.timingSlider.x -= this.sliderSpeed; //move slider left
        }

        //if slider hits right edge of bar, change its direction 
        if( this.timingSlider.x >= (SCREEN_WIDTH - this.timingSlider.width) ) {
            this.sliderDirection = "left";
            this.timingBar.fillColor = 0x0000C8; //reset bar to blue
            this.timingText.setText(""); //erase text
        }
        //if slider hits left edge of bar, change its direction
        else if ( this.timingSlider.x <= (0 + this.timingSlider.width) ) {
            this.sliderDirection = "right";
            this.timingBar.fillColor = 0x0000C8; //reset bar to blue 
            this.timingText.setText(""); //erase text
        }


        this.accuracy;
        //while spacebar is pressed
        if( Phaser.Input.Keyboard.JustDown(SPACE_BAR) ) {
            //record how far the slider was from the timing box in the attack timer
            this.accuracy = Math.abs( this.timingSlider.x - this.timingBox.x );
        }
        //when spacebar is released
        if( Phaser.Input.Keyboard.JustUp(SPACE_BAR) ) {

            console.log(this.accuracy);

            //player hits spacebar w/in 50 px of timingBox
            if(this.accuracy < 50) {
                this.timingBar.fillColor = 0x6ECE2A; //green
                this.timingText.setTint(0x6ECE2A); 
                this.timingText.setText("EXCELLENT!");
                this.timingText.x = CENTER_X - this.timingText.width/2;
            }
            //player hits spacebar w/in 100 px of timingBox
            else if(this.accuracy < 100) {
                this.timingBar.fillColor = 0xFFEF33; //yellow
                this.timingText.setTint(0xFFEF33);
                this.timingText.setText("GOOD");
                this.timingText.x = CENTER_X - this.timingText.width/2;
            }
            //player hits spacebar outside of 100 px
            else {
                this.timingBar.fillColor = 0xFF0000; //red
                this.timingText.setTint(0xFF0000);
                this.timingText.setText("you suck");
                this.timingText.x = CENTER_X - this.timingText.width/2;
            }
        }
    }

}