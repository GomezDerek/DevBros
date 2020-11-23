class AttackMeter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this); //add attackMeter

        this.x = CENTER_X;
        this.y = 100;
        this.sliderSpeed = 10; //how fast the slider moves across the meter
        this.sliderDirection = "right";

    }

    create() {
        //attack meter bar
        this.meterBar = this.scene.add.rectangle(this.x, this.y, SCREEN_WIDTH, 50, 0x0000C8); // 0x0000C8 = blue

        //attack timing box
        this.timingBox = this.scene.add.rectangle(this.x, this.y, 50, 50, 0xFFFFFF); // 0xFFFFFF = white

        //attack meter slider
        this.timingSlider = this.scene.add.rectangle(this.x, this.y, 50, 50, 0x000000); // 0x000000 = black
        
        //timing text
        this.timingText = this.scene.add.text(this.x, this.y - 90, "", { font: "40px Arial" });
        this.timingText.x -= this.timingText.width/2; //this centers the text over the meter
    }

    update() {

    }



}