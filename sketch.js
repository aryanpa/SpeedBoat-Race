var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var boats,boat1,boat2,boat3,boat4;

var pool, boat1_img, boat2_img, boat3_img, boat4_img;
var ground;

function preload(){
  pool = loadImage("pool.png");
  boat1_img = loadImage("Red_speedBoat1.png");
  boat2_img = loadImage("Green_speedBoat1.png");
  boat3_img = loadImage("Blue_speedBoat1.png");
  boat4_img = loadImage("Yellow_speedBoat1.png");
  ground = loadImage("ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
