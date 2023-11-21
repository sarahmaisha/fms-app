
const cursorImage = new Image();
cursorImage.src = 'images/hand.png';
cursorImage.width = 40;
cursorImage.height = 40;
cursorImage.style.position = 'absolute';
cursorImage.style.pointerEvents = 'none';
document.body.appendChild(cursorImage);
document.body.style.cursor = 'none';

document.onmousemove = (e) => {
    cursorImage.style.left = e.pageX - cursorImage.width / 2 + 'px';
    cursorImage.style.top = e.pageY - cursorImage.height / 2 + 'px';
};

let restartButton;
let goodJobCookie;
let clickToStart;
var screen = 0;
//recipe vars
let rectangles = [];
let imagesRecipe = [];
let boxWidth = 60;
let boxHeight = 20;
let rectLocked = [];
let correctSteps = 0;
let preheatOven;


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
let recipeBG;
let correctMessage = "";
let allCorrect = false;
let startTime = 0;
let elapsedTime = 0;
let isTiming = false;
let gameCompleted = false;
let isDrawing=false;
let greenCounter = 0;
let hand;
function preload(){
 // load images

 //recipe images
  clickToStart = loadImage("images/start.png");
  preheatOven = loadImage("images/preheatoven.png");
  let ingredients = loadImage("images/gatherIngredients.png");
  let separately = loadImage("images/mixSeparately.png");
  let combine = loadImage("images/combine.png");
  let spoonfuls = loadImage("images/spoonfuls.png");
  let bake = loadImage("images/bake.png");
  goodJobCookie = loadImage("images/goodjobcookie.png");
  imagesRecipe.push(preheatOven, ingredients, separately, combine, spoonfuls, bake);

hand=loadImage("images/hand.png");
 correctNoise = loadSound("noise/ding.mp3");
 wrongNoise = loadSound("noise/wrong.mp3");
 title = loadImage("images/title.png");
 start = loadImage("images/heretostart.png");
 settings = loadImage("images/settings.png");
 sortVeggies = loadImage("images/image-4.png");
 returnToMenu = loadImage("images/return.png");
 cutThePizza = loadImage("images/CutThePizza.png");
 washTheDishes = loadImage("images/WashDishes.png");
 dishscreen= loadImage("images/WashTheDishes.png");
 veggies1= loadImage("images/veggies_0.png");
 veggies2= loadImage("images/veggies_1.png");
 veggies3= loadImage("images/veggies_2.png");
 veggies4= loadImage("images/veggies_3.png");
 veggies5= loadImage("images/veggies_4.png");
 veggies6= loadImage("images/veggies_5.png");
 veggiesscreen= loadImage("images/Sorting_Vegetables.png");
 recipeBG = loadImage("images/recipeBG.png");
 b1=loadImage("images/basket.png");
 b2=loadImage("images/basket.png");
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
 strokeWeight(0);
 

 strokeWeight(20);
 noFill();
//recipe setup, step initializing
 for (let i = 0; i < 6; i++) {
  rectangles.push({
    img: imagesRecipe[i],
    x: random(width - 430) + 80,
    y: random(height - 200) + i * 20,
    xOffset: 0.0,
    yOffset: 0.0,
    stepNumber: i
  });
  rectLocked.push(false);
}
//recipe restart button
restartButton = createImg('images/restart.png', 'restart');
restartButton.position(230, 250);
restartButton.size(80, 50);
restartButton.mousePressed(restartRecipe);
restartButton.hide();

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
 else  {
 
  strokeWeight(20);
  cursorImage.src = 'images/sponge.png';
  noFill();
  background(dishscreen);
  const distance = dist(mouseX, mouseY, 220, 220);
  const greenMargin = 125; // 7-pixel margin of error added to the radius

  if (distance <= greenMargin) {
    stroke('blue'); // Set the line green
    greenCounter++;
  } else {
    stroke(255, 0, 0); // Set the line red
  }

  line(pmouseX, pmouseY, mouseX, mouseY);

  // Check if the greenCounter is greater than or equal to a certain threshold
  if (greenCounter >= 0.95 * 125) {
    // Stop the drawing process by setting isDrawing to false
    isDrawing = false;
    textSize(32);
    fill(0);
    text("Good job!", width / 2, height / 2);
  }
  if(mouseIsPressed==true&& mouseX>=0&&mouseX<=50&&mouseY>=90&&mouseY<=200){
    selectgame();
  }
  if(mouseIsPressed==true&& mouseX>=0&&mouseX<=50&&mouseY>=0&&mouseY<=70){
   settingsmenu();
 }
}

}



 function mousePressed() {
   if (screen==3){
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
  else if(screen == 4){
    for (let i = 0; i < rectangles.length; i++) {
      let rectTouching = (mouseX > rectangles[i].x &&
        mouseX < rectangles[i].x + 2 * boxWidth &&
        mouseY > rectangles[i].y &&
        mouseY < rectangles[i].y + 2 * boxHeight);
  
      if (rectTouching) {
        rectLocked[i] = true;
        fill(255, 255, 255);
        rectangles[i].xOffset = mouseX - rectangles[i].x;
        rectangles[i].yOffset = mouseY - rectangles[i].y;
      }
    }
  }
  else if (screen==5){
    isDrawing = true;
  }

 }
  function mouseDragged() {
   
    if (screen==3){
    if(selectedImage>=0){
      images[selectedImage].x = mouseX - xOffset;
      images[selectedImage].y = mouseY - yOffset;
    }
    }else if (screen == 4){
      for (let i = 0; i < rectangles.length; i++) {
        if (rectLocked[i]) {
          rectangles[i].x = mouseX - rectangles[i].xOffset;
          rectangles[i].y = mouseY - rectangles[i].yOffset;
        }
      }
    }
  }
  
 
  function mouseReleased() {
    if (screen==3){
    selectedImage = -1;
    }
    else if(screen == 4){
      for (let i = 0; i < rectangles.length; i++) {
        rectLocked[i] = false;
      }
    }
    else if (screen==5){
      isDrawing = false;
    }
 }




 function menuscreen() {
  cursorImage.src = 'images/hand.png';
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
  cursorImage.src = 'images/hand.png';
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
    cursorImage.src = 'images/hand.png';
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
  cursorImage.src = 'images/hand.png';
  strokeWeight(0);
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
     textSize(20);
     text(`Time: ${Math.floor(elapsedTime / 1000)} seconds`, 200, 320);
     
    
   }
  allCorrect = true; // Assume all vegetables are in the correct place

  for (let i = 0; i < images.length; i++) {
    let inGreen = images[i].x > gColorX - 20 &&
      images[i].x < gColorX + 120 &&
      images[i].y > gColorY - 20 &&
      images[i].y < gColorY + 120 &&
      !images[i].pickedRight;

    let inRed = images[i].x > gColorX - 20 &&
      images[i].x < gColorX + 120 &&
      images[i].y > rColorY - 20 &&
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
    } else if (inGreen && images[i].rg == "r") {
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
    } else if (inRed && images[i].rg == "g") {
      images[i].tryAgain = true;
      allCorrect = false; // At least one vegetable is in the wrong place
    }

    if (!images[i].pickedRight) {
      image(images[i].img, images[i].x, images[i].y, imageSize, imageSize);
    }
  }

  text("green basket", 600, 80);
  image(b1, 600, 100, 100, 100);

  text("red basket", 600, 230);
  image(b2, 600, 250, 100, 100);

  for (let i = 0; i < images.length; i++) {
    if (images[i].tryAgain) {
      
      fill(255, 0, 0);
     // text("Try again...", 500, 200);
      image(wrongVeggie, 500, 130, 100,100);

      images[i].tryAgain = false;
      wrongNoise.play();
    }
  }

  fill(0, 255, 0);
  //text(correctMessage, 500, 200);
  // Clear the "Correct!" message after a delay
  if (correctMessage === "Correct!") {
  image(rightVeggie, 500,170,100,100);
   correctNoise.play();
    setTimeout(function () {
      correctMessage = "";
    }, 1000); // Adjust the duration (in milliseconds) as needed
     
  }

  // If all vegetables are in the correct place, display "Good Job!"
  if (allCorrect && correctChoices === images.length) {
    fill(0, 255, 0);
    text("Good Job!", 350, 200);
    fill(0); // Set text color to black
    textSize(20);
    text("Time: " + Math.floor(elapsedTime / 1000) + " seconds", 350, 240);
    
    // Display a restart button
    fill(255);
    rect(390, 280, 100, 40);
    fill(0);
    text("Restart", 360, 290);

    // Check if the restart button is clicked
    if (mouseIsPressed && mouseX >= 360 && mouseX <= 490 && mouseY >= 280 && mouseY <= 320) {
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
  }

 
 
 
 
 
 function cutPizza(){
  background(recipeBG);
  textSize(15);
  fill(0, 0, 0);
  fill(255);
  strokeWeight(4);
  stroke(0);
  rect(600, 200, 100, 180);
  noStroke();
  correctSteps = 0;
 for (let i = 0; i < rectangles.length; i++) {
  //let rightPosition = true;
  let stepX = 600;
  let stepY = 50 + i * 60;
  if (rectangles[i].x > stepX - 80 && rectangles[i].y > stepY - 30 && rectangles[i].y < stepY + boxHeight - 10){
    rectangles[i].x = stepX - 60;
    rectangles[i].y = stepY - 20;
    fill(0, 255, 0);
  }
  if (rectangles[i].x == stepX - 60) {
    correctSteps++;
    rectangles[i].x++;
  }

  image(rectangles[i].img, rectangles[i].x, rectangles[i].y, 2 * boxWidth, 2 * boxHeight);

  fill(0);
  //text(correctSteps, 200, 230);
  text(i + 1, 520, 50 + i * 60);
  noFill();
  stroke(220, 190, 150);
  rect(stepX, stepY, boxWidth, boxHeight);
  noStroke();
  if (correctSteps == 6) {
    //textSize(30);
    //fill(0,255,0);
    //text('Good job!!', 200, 200);
    image(goodJobCookie, 170, 50);
    textSize(15);
    restartButton.show();
  }else{
    restartButton.hide();
  }
  
}



 image(returnToMenu, 10,20,100,40);


 if(mouseIsPressed==true&& mouseX>=10&&mouseX<=110&&mouseY>=20&&mouseY<=60){
   selectgame();
 }
}

function restartRecipe() {
  correctSteps = 0;
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].x = 100;
    rectangles[i].y = random(height - 80) + i * 20;
  }
}


  function dishes(){
 
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

 
 


