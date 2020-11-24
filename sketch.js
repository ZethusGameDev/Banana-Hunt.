var PLAY = 0;
var END = 1;
var gameState = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var score;
var obstacle;
var score;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(70,310,10,10);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.12;

  
  ground = createSprite(300,350,600,10);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
  score = 0;
}

function draw() {
  background("white");
  
  fill("black");
  textSize(10);
  
  text ("Survival Time : " + survivalTime,50,50);
  text ("Score : " + score, 500,50);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(gameState === PLAY) {
  
   survivalTime = survivalTime +      Math.round(getFrameRate()/60);
  
 if(monkey.isTouching(FoodGroup)) {
   score = score + 10;
   FoodGroup.destroyEach();
 }
  ground.velocityX = -3;
    
 
  
  if(keyDown("space") && monkey.y > 308) {
    monkey.velocityY = -15;
  }
  
  spawnObstacles();
  
  spawnBanana();
  //console.log(monkey.y);
  }
  
  monkey.collide(ground);
    
  if(ground.x > 0) {
    ground.x = ground.width/2;
  }
  
  if(monkey.isTouching(obstacleGroup)) {
    gameState = END;
  } 
  
  if(gameState === END) {
    obstacle.velocityX = 0;
    banana.velocityX = 0;  
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    score = score;
  }
  
  
  
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600,325,10,10);
    obstacle.addImage("obstacle" , obstacleImage);
    obstacle.scale = 0.125;
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    //Adding the obstacle.
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 100 === 0) {
    banana = createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage("banana" , bananaImage);
    banana.scale = 0.125;
    banana.velocityX = -6;
    banana.lifetime = 100;
    //Adding the Banana.
    FoodGroup.add(banana);
  }
}


