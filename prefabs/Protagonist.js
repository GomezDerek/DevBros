//prefab for protagonist player will be controlling

//class Protagonist extends Phaser.GameObjects.Sprite {
class Protagonist extends Phaser.Physics.Arcade.Sprite {
    //constructor(scene, x, y, texture, frame) { 
    constructor(scene, x, y) {
        //call Phaser Sprite constructor
        
        //super(scene, x, y, texture, frame);
        super(scene, x, y, "walk", 0);

        //set up sprite 
        scene.add.existing(this).setOrigin(.5, .5); //add sprite to scene, origin at center 
        scene.physics.add.existing(this);           //add physics body
        this.body.collideWorldBounds = true;        //keep sprite from going off screen


        this.setScale(.1);    //scale it wayyyy down

        // adjust physics body after it was scaled down
        this.body.setSize(900, 1600);
        this.body.offset.y = 250;
        this.body.offset.x = 550;             
        

        //this.direction = "right";
        
    }

    create() {


        

    }

    update() {
        //super.update();
        //SPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //let RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //while right key is pressed
        // if( Phaser.Input.Keyboard.JustDown(SPACEBAR) ) {
        //     this.x += 2;
        // }

        // if (RIGHTKEY.isDown) {
        //     this.x += 2;
        // }
    }
}