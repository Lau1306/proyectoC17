var tower, towerImg;
var door, doorImg, doorsGroup;
var railing, railingImg, railingsGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg =loadImage("door.png");
  railingImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-jumping.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  railingsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300;
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x-3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(railingsGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
    score = score + Math.round(getFrameRate()/60);    
    
    spawnDoors();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(20);
    text("Score: " + score, 450, 50);
  }
    
  if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
  }
}

function spawnDoors(){
  if(frameCount % 240 == 0){
    door = createSprite(200, -50);
    door.addImage("door", doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    railing = createSprite(200,10);
    railing.addImage("railing", railingImg);
    railing.x = door.x;
    railing.velocityY = 1;
    railing.setLifetime = 800;
    railingsGroup.add(railing);
    
    invisibleBlock = createSprite(door.x,15, railing.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth += 1;
  } 
}