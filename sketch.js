var trex, trex_running, trex_collided;
var  ground, invisibleGround, groundImage, cloudsGroup,CloudImage,obstaclesGroup,obstacleImage1,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage2,obstacleImage6,gameOverimage,restartImage;

 var PLAY = 1;
  var END = 0;
 var gameState = PLAY;
 var count = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  cloudImage= loadImage("cloud.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  obstacleImage1=loadImage("obstacle1.png");
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  obstacleImage5=loadImage("obstacle5.png");
  obstacleImage6=loadImage("obstacle6.png");
  
   gameOverimage=loadImage("restart.png");
  restartImage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,140);
  gameOver.scale=0.5;
  gameOver.addImage("gameOver",gameOverimage);
    restart = createSprite(300,110);
  restart.scale=0.5
  
  restart.addImage("restart",restartImage);

    
  cloudsGroup=new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(180);
  
  
  
  
  if(gameState === PLAY){
    
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
    trex.velocityY = trex.velocityY + 0.8
  
    count = count+ Math.round(getFrameRate()/30);
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
   gameOver.visible = false;
  restart.visible = false;
    
  spawnClouds();
  spawnObstacles();
  }
  
    if(obstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  
  else if(gameState=== END) {
    
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
     trex.changeAnimation("collided",trex_collided);
    
  }
   
  if(mousePressedOver(gameOver)) {
    reset();
    console.log("reset")
  }
  
    
  trex.collide(invisibleGround);
  
  textSize(18);
textFont("Georgia");
textStyle(BOLD);
text("score : "+count , 254,86);
  drawSprites();
  

}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(590,80,40,10);
    cloud.y = random(30,100);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
  
  function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(590,180,10,40);
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    console.log(rand);
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 90;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    switch(rand){
      case 1:obstacle.addImage(obstacleImage1);
        break;
        case 2:obstacle.addImage(obstacleImage2);
        break;
        case 3:obstacle.addImage(obstacleImage3);
        break;
        case 4:obstacle.addImage(obstacleImage4);
        break;
        case 5:obstacle.addImage(obstacleImage5);
        break;
        case 6:obstacle.addImage(obstacleImage6);
        break;
        default:break;
    }
      
    
  }
    
  

}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
}
