var PLAY=1;
var END=0;
var gameState=PLAY
var oscar, oscar_running;
var ground, invisibleGround;
var spike, spike_img, powerUp, poisonousPlant, poisonousPlant_img;
var obstaclesGroup, powerUpGroup;
var life;
var bg, background_Image;


function preload() {
oscar_running = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");

spike_img = loadImage("spike.png");
poisonousPlant_img = loadImage("plant.png");
 background_Image = loadImage("bg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  invisibleGround = createSprite(width/2,height-30,width,10);
  invisibleGround.visible = false;

  bg = createSprite(675, 250, 1500, 550);
  bg.addImage(background_Image);
  bg.scale = 1;

  life = 3;
 
  oscar = createSprite(200,height-70,50,50);
  oscar.addAnimation("run", oscar_running);
  oscar.setCollider("rectangle",0,0);
  oscar.debug = false;  

  obstaclesGroup = new Group();
  powerUpGroup = new Group();
}

function draw() {
background("black");

if(gameState===PLAY){
  bg.velocityX = -5;

  if (bg.x < 0) {
    bg.x = 500

  }

 

  if(keyDown("UP_ARROW")&& oscar.y >= 400 ||touches.length>0) {
    oscar.velocityY = -20;
    touches=[]
  }

  if(obstaclesGroup.isTouching(oscar)){
    life = life-1;
    obstaclesGroup.destroyEach();
    console.log(life);
  }

  if(powerUpGroup.isTouching(oscar)){
    life = life+1;
    
  }
  
  if(life===0){
    gameState = (END);
  }
  oscar.velocityY = oscar.velocityY + 1;

  oscar.collide(invisibleGround);
spikes();
poisonPlant();

}
if(gameState===END){
  textSize(100);
  fill("red");

  text("GAME OVER",400,100);
}

drawSprites();
textSize(20);
fill("black");
text("Lives Left = "+life,displayWidth-200,100);
}

function spikes(){
 if(frameCount%200===0){
  spike = createSprite(width,600,20,20);
  spike.addImage(spike_img);
  spike.velocityX = -8;
  spike.y = 550;
  obstaclesGroup.add(spike);
  spike.lifetime = (width/8);

  spike.depth = bg.depth;
  spike.depth = spike.depth+1;
 }
}


function powerUpf(){
 if(frameCount%2500===0) {
   powerUp = createSprite(width,300,20,20);
   powerUp.shapeColor = "blue";
   powerUp.velocityX = -8;
   powerUp.y = 300
   powerUpGroup.add(powerUp);
   powerUp.lifetime = (width/8);

   powerUp.depth = bg.depth;
   powerUp.depth = powerUp.depthe+1;
 }
}

function poisonPlant(){
  if(frameCount%340===0){
    poisonousPlant = createSprite(width,500,20,20);
    poisonousPlant.addImage(poisonousPlant_img);
    poisonousPlant.velocityX = -8;
    poisonousPlant.y = 500;
    poisonousPlant.scale = 0.5
    obstaclesGroup.add(poisonousPlant);
    poisonousPlant.lifetime = (width/8);

    poisonousPlant.depth = bg.depth;
    poisonousPlant.depth = poisonousPlant.depth+1;
   }
}