
var screen=0;
let images = [];
let selectedImage = -1;
let imageSize = 60;
let xOffset = 0.0;
let yOffset = 0.0;
let correctChoices = 0;
let gColorX = 600; // X-coordinate at which color changes
let gColorY = 100;
let rColorY = 200;
let veggiesscreen;
let correctMessage = "";
let allCorrect = false;
let startTime = 0;
let elapsedTime = 0;
let isTiming = false;
let gameCompleted = false;


function preload(){
 // load images
 
 correctNoise = loadSound("noise/ding.mp3");
 wrongNoise = loadSound("noise/wrong.mp3");
 title = loadImage("images/title.png");
 start = loadImage("images/heretostart.png");
 settings = loadImage("images/settings.png");
 sortVeggies = loadImage("images/image-4.png");
 returnToMenu = loadImage("images/return.png");
 cutThePizza = loadImage("images/CutThePizza.png");
 washTheDishes = loadImage("images/washTheDishes.png");
 veggies1= loadImage("images/veggies_0.png");
 veggies2= loadImage("images/veggies_1.png");
 veggies3= loadImage("images/veggies_2.png");
 veggies4= loadImage("images/veggies_3.png");
 veggies5= loadImage("images/veggies_4.png");
 veggies6= loadImage("images/veggies_5.png");
 veggiesscreen= loadImage("images/Sorting_Vegetables.png");
 greenBasket = loadImage("images/greenBasket.png");
 redBasket = loadImage("images/redBasket.png");
 restart = loadImage("images/restart.png");
 goodJob = loadImage("images/good_job.png");
 cloud = loadImage("images/cloud.png");
 b1=loadImage("images/basket.png");
 wrongVeggie = loadImage("images/wrongVeggie.png");
 rightVeggie = loadImage("images/correctVeggie.png");

 images.push({img: veggies1, initialX: 100, initialY: 100, x: 100, y: 100,
  pickedRight: false,
  canMove: true,
  rg: "g"
});
images.push({img: veggies2, initialX: 200, initialY: 100, x: 200, y: 100,
  pickedRight: false,
  canMove: true,
  rg: "g"
});
images.push({img: veggies3, initialX: 300, initialY: 100, x: 300, y: 100,
  pickedRight: false,
  canMove: true,
  rg: "r"
});
images.push({img: veggies4, initialX: 100, initialY: 200, x: 100, y: 200,
  pickedRight: false,
  canMove: true,
  rg: "r"
});
images.push({img: veggies5, initialX: 200, initialY: 200, x: 200, y: 200,
  pickedRight: false,
  canMove: true,
  rg: "g"
});
images.push({img: veggies6, initialX: 300, initialY: 200, x: 300, y: 200,
  pickedRight: false,
  canMove: true,
  rg: "r"
});
}


function setup() {
 createCanvas(800, 400);
 startTime = millis();
 /*for (let i = 0; i < 6; i++) {
   rectangles.push({
     x: 75,
     y: i * 50,
     xOffset: 0.0,
     yOffset: 0.0,
   });
   rectLocked.push(false);
 }*/
  rectMode(RADIUS);
  //strokeWeight(2);
}

function draw(){
 if (screen==0){
   menuscreen();
 }
 else if (screen==1){
   selectscreen();
 }
 else if (screen==2){
   settingsscreen();
 }
 else if (screen==3){
   veggies();
 }
 else if (screen==4){
   cutPizza();
 }
 else {
   dishes();
 }
 }


 function mousePressed() {
   for (let i = 0; i < images.length; i++) {
     let touching =
       mouseX > images[i].x &&
       mouseX < images[i].x + imageSize &&
       mouseY > images[i].y &&
       mouseY < images[i].y + imageSize &&
       images[i].canMove;
      if (touching){ //&& !rectLocked[i]) {
       //rectLocked[i] = true;
       selectedImage = i;
       xOffset = mouseX - images[i].x;
       yOffset = mouseY - images[i].y;
     }
   }
 }
  function mouseDragged() {
    if(selectedImage>=0){
      images[selectedImage].x = mouseX - xOffset;
      images[selectedImage].y = mouseY - yOffset;
    }

 }
  function mouseReleased() {
    selectedImage = -1;
  
 }




 function menuscreen() {
 background('wheat');
 textSize(50);
 fill('maroon');
 image(title,330,100,200,200);
 //text("Sun Devil COOKS!",220,200);
  //start button
 
 textSize(20);
 fill('maroon');
 image(start, 230,300,400,80);
  //settings button
 image(settings, 680,30,100,60);
   if (screen==0&& mouseIsPressed==true &&mouseX>=230&&mouseX<=630&&mouseY>=300&&mouseY<=380 ){
     selectgame();
   }
  if(mouseIsPressed==true&& mouseX>=650&&mouseX<=780&&mouseY>=30&&mouseY<=60){
   settingsmenu();
 }
  }
 function settingsscreen(){
    background('wheat');
 textSize(50);
 fill('maroon');
 image(title,330,100,200,200);
 image(returnToMenu, 640,340,150,50);
 if(mouseIsPressed==true&& mouseX>=565&&mouseX<=790&&mouseY>=315&&mouseY<=365){
   homepage();
 }
 }
  function selectscreen(){
 background('wheat');
 textSize(25);
 fill('maroon');
 image(title,320,0,200,200);
  image(sortVeggies, 120, 220, 170, 60);
 if(mouseIsPressed==true&& mouseX>=120&&mouseX<=290&&mouseY>=220&&mouseY<=280){
   sortveg();
 } 


  textSize(20);
 fill('wheat');
 image(cutThePizza,320,220,170,60);
if(mouseIsPressed==true&& mouseX>=320&&mouseX<=490&&mouseY>=220&&mouseY<=280){
   pizzapizza();
 }  


  
 textSize(20);
 fill('wheat');
 image(washTheDishes,510,220,180,60);
 if(mouseIsPressed==true&& mouseX>=510&&mouseX<=730&&mouseY>=220&&mouseY<=280){
   washing();
 } 


  image(returnToMenu,10,340,140,50);
 if(mouseIsPressed==true&& mouseX>=10&&mouseX<=190&&mouseY>=340&&mouseY<=390){
   homepage();
 }
  
 }
 function veggies() {
  background(veggiesscreen);
    // ...

   // Check if any vegetable is being moved
   let movingVegetable = false;

   for (let i = 0; i < images.length; i++) {
     if (images[i].canMove) {
       movingVegetable = true;
       break;
     }
   }
 
   if (movingVegetable && !isTiming) {
     // Start the timer when the user interacts with the vegetables
     startTime = millis() - elapsedTime;
     isTiming = true;
   } else if (!movingVegetable) {
     // Stop the timer when there are no moving vegetables
     isTiming = false;
   }
 
   if (isTiming) {
     // Continue updating the elapsed time while moving vegetables
     elapsedTime = millis() - startTime;
   }
 
   // ...
 
   // Display the elapsed time when all vegetables are correctly placed
   if (allCorrect) {
     fill(0); // Set text color to black
     textSize(15);
     image(cloud,30,250,230,180);
     text(`Time: ${Math.floor(elapsedTime / 1000)} seconds`, 60, 350);
   }
  allCorrect = true; // Assume all vegetables are in the correct place

  for (let i = 0; i < images.length; i++) {
    let inGreen = images[i].x > gColorX - 20 &&
      images[i].x < gColorX + 120 &&
      images[i].y > gColorY - 20 &&
      images[i].y < gColorY + 80 &&
      !images[i].pickedRight;

    let inRed = images[i].x > gColorX - 20 &&
      images[i].x < gColorX + 120 &&
      images[i].y > rColorY +20&&
      images[i].y < rColorY + 120 &&
      !images[i].pickedRight;

    if (inGreen && images[i].rg == "g") {
      images[i].canMove = false;
      selectedImage = -1;
      images[i].x = gColorX + 25;
      images[i].y = gColorY + 20;
      images[i].pickedRight = true;
      correctChoices++;
      correctMessage = "Correct!";
      correctNoise.play();
    } else if (inGreen && images[i].rg == "r") {
      wrongNoise.play();
      images[i].tryAgain = true;
      allCorrect = false; // At least one vegetable is in the wrong place
    }

    if (inRed && images[i].rg == "r") {
      images[i].canMove = false;
      selectedImage = -1;
      images[i].x = gColorX + 25;
      images[i].y = rColorY + 30;
      images[i].pickedRight = true;
      correctChoices++;
      correctMessage = "Correct!";
      correctNoise.play();
    } else if (inRed && images[i].rg == "g") {
      wrongNoise.play();
      images[i].tryAgain = true;
      allCorrect = false; // At least one vegetable is in the wrong place
    }

    if (!images[i].pickedRight) {
      image(images[i].img, images[i].x, images[i].y, imageSize, imageSize);
    }
  }

  
  image(b1, 600, 100, 100, 100);
  image(greenBasket, 615, 150, 65, 40);


  image(b1, 600, 250, 100, 100);
  image(redBasket,615,300,65,40);

  for (let i = 0; i < images.length; i++) {
    if (images[i].tryAgain) {
      //wrongNoise.play();
      fill(255, 0, 0);
     // text("Try again...", 500, 200);
      image(wrongVeggie, 500, 130, 100,100);

      images[i].tryAgain = false;
    }
  }

  fill(0, 255, 0);
  //text(correctMessage, 500, 200);
  // Clear the "Correct!" message after a delay
  if (correctMessage === "Correct!") {
   //correctNoise.play();
  image(rightVeggie, 500,170,100,100);
    setTimeout(function () {
      correctMessage = "";
    }, 1000); // Adjust the duration (in milliseconds) as needed
     
  }

  // If all vegetables are in the correct place, display "Good Job!"
  if (allCorrect && correctChoices === images.length) {
    fill(0, 255, 0);
    image(goodJob, 250, 150,200,150);
    fill(0); // Set text color to black
    textSize(20);
   // text("Time: " + Math.floor(elapsedTime / 1000) + " seconds", 350, 240);
    
    //restart
    image(restart,330,320,150,90);

    // Check if the restart button is clicked
    if (mouseIsPressed && mouseX >= 330 && mouseX <= 480 && mouseY >= 320 && mouseY <= 410) {
      resetVeggies();
    }

  }

if(mouseIsPressed==true&& mouseX>=0&&mouseX<=50&&mouseY>=90&&mouseY<=200){
   selectgame();
 }
 if(mouseIsPressed==true&& mouseX>=0&&mouseX<=50&&mouseY>=0&&mouseY<=100){
  settingsmenu();
}

  }

  function resetVeggies(){
// Reset all game-related variables
correctChoices = 0;
allCorrect = false;
gameCompleted = false;
isTiming = false;
elapsedTime = 0;

// Reset the vegetable positions
for (let i = 0; i < images.length; i++) {
  images[i].x = images[i].initialX;
  images[i].y = images[i].initialY;
  images[i].pickedRight = false;
  images[i].canMove = true;
  }

 
 
 
 
 
 function cutPizza(){
    background('blue');
 textSize(50);
 fill('maroon');
 image(title,330,100,200,200);
 image(returnToMenu, 640,340,150,50);
 if(mouseIsPressed==true&& mouseX>=640&&mouseX<=790&&mouseY>=340&&mouseY<=390){
   selectgame();
 }
 }
  function dishes(){
    background('magenta');
 textSize(50);
 fill('maroon');
 image(title,330,100,200,200);
 image(returnToMenu, 640,340,150,50);
 if(mouseIsPressed==true&& mouseX>=640&&mouseX<=790&&mouseY>=340&&mouseY<=390){
   selectgame();
 }
 }
 
 function homepage(){
   screen=0;
 }
 function selectgame(){
   screen=1;
 }
  function settingsmenu(){
   screen=2;
 }
  function sortveg(){
   screen=3;
 }
  function pizzapizza(){
   screen=4;
 }
 function washing(){
   screen=5;
 }
 


  }