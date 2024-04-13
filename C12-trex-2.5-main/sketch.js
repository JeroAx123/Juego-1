var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, cloudsGroup;
var obstacle;
var obstacle_1,obstacle_2,obstacle_3,obstacle_4,obstacle_5,obstacle_6, obstaclesGroup;
var rand 
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var jumpSound,dieSound,checkpointSound
var Gamever,Restart


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 
  obstacle_1 = loadImage("obstacle1.png")
  obstacle_2 = loadImage("obstacle2.png")
  obstacle_3 = loadImage("obstacle3.png")
  obstacle_4 = loadImage("obstacle4.png")
  obstacle_5 = loadImage("obstacle5.png")
  obstacle_6 = loadImage("obstacle6.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkpointSound = loadSound("checkpoint.mp3")

  Gameover = loadImage("gameOver.png")
  Restart = loadImage("restart.png")
}

function setup() {

  createCanvas(600,200)
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameOver = createSprite(300,140)
  gameOver.addImage(Gameover)
  gameOver.scale=0.5

  restart = createSprite(300,100)
  restart.addImage(Restart)
  restart.scale = 0.8

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
obstaclesGroup=new Group();
cloudsGroup=new Group();

score = 0
}
function draw() {
  background(255 );
  
trex.setCollider("circle",0,0,40)


  text(" score "+score, 500,50)

  if(gameState === PLAY){

gameOver.visible = false
restart.visible = false

    ground.velocityX = -4;

    score = score+Math.round(frameCount/60)
    
    if(score>0 && score%100 === 0){
      checkpointSound.play()
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(touches.length>0 || keyDown("space")&& trex.y >= 150) {
      trex.velocityY = -10;
      jumpSound.play()
      touches = {}
    }

    trex.velocityY = trex.velocityY + 0.8

    spawnClouds()
    obstacles()

    if (trex.isTouching(obstaclesGroup)){ 
      dieSound.play()
      gameState = END
  }
}
  else if(gameState===END){

    gameOver.visible = true
    restart.visible = true 
    
    ground.velocityX = 0;

    trex.changeAnimation("collided",trex_collided)

obstaclesGroup.setLifetimeEach(-1)

cloudsGroup.setLifetimeEach(-1)

obstaclesGroup.setVelocityXEach(0)

cloudsGroup.setVelocityXEach(0)

if(mousePressedOver(restart)){
  Reset()
  }

  }
 
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnClouds(){
 if(frameCount%60===0){
cloud = createSprite(600,100,40,10)
cloud.addImage(cloudImage)
cloud.y = Math.round(random(10,100))
cloud.scale = 0.8
cloud.lifetime = 200;
 cloud.velocityX = -4
 cloud.depth = trex.depth;
 trex.depth = trex.depth+1;
 cloudsGroup.add(cloud)
}
 }
 
 function obstacles(){
  rand = Math.round(random(1,6))
if (frameCount%60===0){
 obstacle = createSprite (600,165,40);
 obstacle.velocityX = -6; 

switch(rand){
  case 1: obstacle.addImage(obstacle_1)
  break
  case 2: obstacle.addImage(obstacle_2)
  break
  case 3: obstacle.addImage(obstacle_3)
  break
  case 4: obstacle.addImage(obstacle_4)
  break
  case 5: obstacle.addImage(obstacle_5)
  break
  case 6: obstacle.addImage(obstacle_6)
  break
  default:break
}
obstacle.scale = 0.5  
obstacle.lifetime = 300
obstaclesGroup.add(obstacle)
 }
 }

function Reset(){
  gameState = PLAY

  gameOver.visible = false
  restart.visible = false 
  
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()

trex.changeAnimation("running",trex_running)

  score = 0
}


