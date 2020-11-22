// "tame the javashrek" - Nathan Altice
"use strict";

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Play ]
};

// define game
var game = new Phaser.Game(config);

// global variables
const SCALE = 1;
const CENTER_X = game.config.width/2;
const CENTER_Y = game.config.height/2;
const SCREEN_WIDTH = game.config.width;
const SCREEN_HEIGHT = game.config.height;

var SPACE_BAR;