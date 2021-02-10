//making monkey
var monkey , monkey_running;

//making ground
var ground;

//making banana and obstacles
var banana ,bananaImage, obstacle, obstacleImage;  

//making banana and obstacles group
var bananaGroup, obstacleGroup;

//sound effects
var jumpSound;
var gameOverSound;

//score
var score = 0;

//making different gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  //monkey animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  //loading the banana and obstacles images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //loading the sound effects
  jumpSound = loadSound("salamisound-6718888-sfx-jump-2-game-computer.mp3");
  gameOverSound = loadSound("mixkit-failure-arcade-alert-notification-240.wav");
 
}



function setup() {
  
  //creating the canvas
  createCanvas(400,400);
  
  //making a monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //making a ground sprite
  ground = createSprite(400,370,900,10);
  console.log(ground.x);
  
  //making new banana and obstacles groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  
  //giving the background colour
 background("white");
  
  //displaying the score
  text("Survial Time = " + score,150,30);

  //putting the gameState numbers in the console for reference
  console.log("This is", gameState);
  
  //gameState PLAY
  if(gameState === PLAY){
    
    //increasing the score
    score = score + Math.round(frameCount/100 );
    
    //command for the monkey to jump
    if(keyDown("space") && monkey.y >= 250){
      monkey.velocityY=-10;
      jumpSound.play();
  }
  
    //making the ground move
  ground.velocityX = -4;
    
  
    //making the ground infinite
  ground.x = ground.width/2;

    
  //giving gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.5
  
  //preventing the monkey from falling through the ground
  monkey.collide(ground);
   
    
    //calling the banana and rock functions
    bananas();
    rock();

    
    //Transitioning to the gameState END
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
      gameOverSound.play();
    }
     
   }
    

  
      //gameState END
   else if(gameState === END){ 
   
     //stoping the ground and the monkey from moving
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    
     
     //making the bananGroup and the obstacleGroup stop
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
      
      
    }
    
  
  //displaying all the sprites given in function setup
  drawSprites();
 
}

//making a function for the bananas
function bananas(){
  
  //making it appear at equal intervals
  if(frameCount%80 === 0){
  
    //giving different functions to the banana sprite
  banana = createSprite(400,200,20,20);
  banana.addImage("banana", bananaImage);
  banana.velocityX = -4;
  banana.y = Math.round(random(150,300));
  banana.scale = 0.1;
  banana.lifetime = 100;
  
     
    //adding the banana sprite in the bananaGroup
  bananaGroup.add(banana);
    
  }
  

}

//making a function for obstacles
function rock(){
  
  //making it appear at equal intervals
  if(frameCount%250 === 0){
  
    //giving different functions to the obstacle sprite
  obstacle = createSprite(350,350,20,20);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.velocityX = -4;
  obstacle.scale = 0.1;
  obstacle.lifetime = 100;
  
    //adding the obstacle sprite in the obstacleGroup
    obstacleGroup.add(obstacle);
    
  }
  
  
}



