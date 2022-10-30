var HauntedHouse 
var Shooter
var Ghost
var gameState="fight"
var bullets= 50 
var lives= 3  
var score=0 
function preload(){
HauntedHouseimg=loadImage("Save Horror.webp")
Shooterimg=loadImage("shooter_1.png")
Shooting=loadImage("shooter_3.png")
Boo=loadImage("PNGPIX-COM-Ghost-PNG-Transparent-Image.png")
Heart1img=loadImage("heart_1.png")
Heart2img=loadImage("heart_2.png")
Heart3img=loadImage("heart_3.png")
Bulletimg=loadImage("th__5_-removebg-preview.png")

}
function setup() {
 createCanvas(windowWidth,windowHeight);
 
 HauntedHouse=createSprite(width/2,height/2,width,height)
 HauntedHouse.scale=1.1
 HauntedHouse.addImage(HauntedHouseimg)
 Shooter=createSprite(200,700,2,3)
 Shooter.addImage(Shooterimg)
 Shooter.scale=0.8
 GhostGroup=new Group()
 Heart1=createSprite(115,40,10,7)
 Heart1.addImage(Heart1img)
 Heart1.scale=0.3
 Heart1.visible=false
 Heart2=createSprite(115,40,10,7)
 Heart2.addImage(Heart2img)
Heart2.scale=0.3
 Heart2.visible=false
 Heart3=createSprite(115,40,10,7)
 Heart3.addImage(Heart3img)
 Heart3.scale=0.3
 BulletGroup=new Group()
 
}

function draw() {
  background(255,255,255);  
 
  drawSprites();
  textSize(20)
  fill("green")
  text("Score="+score,500,50)
  text("lives="+lives,800,50)
  text("bullets="+bullets,1100,50)
 if (gameState=="fight"){
  if (lives==3){
  Heart3.visible=true 
  Heart1.visible=false
  Heart2.visible=false               
  }
  if (lives==2) {
  Heart2.visible=true
  Heart3.visible=false
  Heart1.visible=false 
  }
  if (lives==1) {
  Heart1.visible=true
  Heart2.visible=false
  Heart3.visible=false 
 }
  if (lives==0){
   gameState="lost"
   Heart1.visible=false
  }
  if(score==100){
    gameState="win"
    }
  
  if (keyDown("LEFT_ARROW")){
   Shooter.x=Shooter.x-10

  }
  if(keyDown("RIGHT_ARROW")) {
  Shooter.x=Shooter.x+10

  }
  if (keyWentDown("SPACE")) {
  bullet=createSprite(Shooter.x+150,Shooter.y-65,0.5,0.3)
  bullet.velocityX=10 
  BulletGroup.add(bullet)
  bullets=bullets-1 
  bullet.scale=0.1
  bullet.addImage(Bulletimg)
  Shooter.addImage (Shooting)
  

  }
  if (bullets==0){
  gameState="bullet"
}
         
if (keyWentUp("SPACE")) {
  Shooter.addImage(Shooterimg)
}
if (GhostGroup.isTouching(Shooter)) {
for(var i=0;i<GhostGroup.length;i++){
  if (GhostGroup[i].isTouching(Shooter)) {
    GhostGroup[i].destroy()
   
  lives=lives-1 
  }
} 


}
if (GhostGroup.isTouching(BulletGroup)) {
  for(var i=0;i<GhostGroup.length;i++){
    if (GhostGroup[i].isTouching(BulletGroup)) {
      GhostGroup[i].destroy()
     BulletGroup.destroyEach()
     score=score+5
    }
  } 
  
  
  }
  Ghost1000()
}
if(gameState=="lost"){
  textSize(40)
  fill("red")
  text("RIP! You Lost", 400,400)
  GhostGroup.destroyEach()
  Shooter.destroy()
}                                                                                                               
else if  
(gameState=="win"){
  textSize(40)
  fill("lime")
  text("Congratulations! You Won!!", 400,400)
  GhostGroup.destroyEach()
  Shooter.destroy()
}
else if (gameState=="bullet"){
  textSize(40)
  fill("white")
  text("You ran out of Bullets!!", 400,400)
  GhostGroup.destroyEach()
  Shooter.destroy()
}
}

function Ghost1000(){
  if (frameCount%60==0){
    Ghost=createSprite(random(500,2000),700,2,3)
    Ghost.addImage(Boo)
    Ghost.scale=0.15
    Ghost.velocityX=-4  
    Ghost.lifetime=400
    GhostGroup.add(Ghost)

  }

}