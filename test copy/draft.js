var screen=0;
let rectangles = [];
let boxSize = 30;
let rectLocked = [];
let GcolorChangeX = 400; // X-coordinate at which color changes
let GcolorChangeY = 100;
let RcolorChangeY = 200;

function preload(){
  // load images
  title = loadImage("images/title.png");
  start = loadImage("images/heretostart.png");
  settings = loadImage("images/settings.png");
  sortVeggies = loadImage("images/image-4.png");
  returnToMenu = loadImage("images/return.png");
  cutThePizza = loadImage("images/CutThePizza.png");
  washTheDishes = loadImage("images/washTheDishes.png");
}
function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 6; i++) {
    rectangles.push({
      x: 75,
      y: i * 50,
      xOffset: 0.0,
      yOffset: 0.0,
    });
    rectLocked.push(false);
  }
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
  
  function mousePressed() {
    for (let i = 0; i < rectangles.length; i++) {
      let rectTouching =
        mouseX > rectangles[i].x &&
        mouseX < rectangles[i].x + boxSize &&
        mouseY > rectangles[i].y &&
        mouseY < rectangles[i].y + boxSize;
  
      if (rectTouching && !rectLocked[i]) {
        rectLocked[i] = true;
        rectangles[i].xOffset = mouseX - rectangles[i].x;
        rectangles[i].yOffset = mouseY - rectangles[i].y;
      }
    }
  }
  
  function mouseDragged() {
    for (let i = 0; i < rectangles.length; i++) {
      if (rectLocked[i]) {
        rectangles[i].x = mouseX - rectangles[i].xOffset;
        rectangles[i].y = mouseY - rectangles[i].yOffset;
      }
    }
  }
  
  function mouseReleased() {
    for (let i = 0; i < rectangles.length; i++) {
      if (rectLocked[i]) {
        let inGreenBox =
          rectangles[i].x > 450 &&
          rectangles[i].x + boxSize < 550 &&
          rectangles[i].y > 100 &&
          rectangles[i].y + boxSize < 200;
  
        let inRedBox =
          rectangles[i].x > 450 &&
          rectangles[i].x + boxSize < 550 &&
          rectangles[i].y > 250 &&
          rectangles[i].y + boxSize < 350;
  
        if (inGreenBox) {
          rectangles[i].x = 475;
          rectangles[i].y = 125;
        } else if (inRedBox) {
          rectangles[i].x = 475;
          rectangles[i].y = 275;
        } else {
          rectangles[i].x = 75;
          rectangles[i].y = i * 50;
        }
  
        rectLocked[i] = false;
      }
    }
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
    background(237, 34, 93);
    fill(255, 255, 255);
    text("green basket", 450, 80);
    rect(450, 100, 100, 100);
    text("red basket", 450, 230);
    rect(450, 250, 100, 100);
  
    for (let i = 0; i < rectangles.length; i++) {
      stroke(156, 39, 176);
      if (i % 2 == 0) {
        fill(100, 232, 80);
      } else {
        fill(252, 80, 80);
      }
  
      // Check if the rectangle's X-coordinate is greater than the GcolorChangeX value
      if (
        rectangles[i].x > GcolorChangeX &&
        rectangles[i].x < 550 &&
        rectangles[i].y > GcolorChangeY &&
        rectangles[i].y < 200
      ) {
        if (i % 2 == 0) {
          text("correct!", 400, 150);
          fill(0, 255, 255);
        } else {
          text("try again...", 390, 150);
          fill(255, 0, 255);
        }
      }
      if (
        rectangles[i].x > GcolorChangeX &&
        rectangles[i].x < 550 &&
        rectangles[i].y > RcolorChangeY &&
        rectangles[i].y < 350
      ) {
        if (i % 2 == 1) {
          text("correct!", 400, 300);
          fill(0, 255, 255);
        } else {
          text("try again...", 390, 300);
          fill(255, 0, 255);
        }
      }
  
      // Display and check for interaction with each rectangle
      let rectTouching =
        mouseX > rectangles[i].x &&
        mouseX < rectangles[i].x + boxSize &&
        mouseY > rectangles[i].y &&
        mouseY < rectangles[i].y + boxSize;
  
      if (rectTouching && !rectLocked[i] && mouseIsPressed) {
        rectLocked[i] = true;
        rectangles[i].xOffset = mouseX - rectangles[i].x;
        rectangles[i].yOffset = mouseY - rectangles[i].y;
      }
  
      if (rectLocked[i]) {
        // Update the position of the selected rectangle while dragging
        rectangles[i].x = mouseX - rectangles[i].xOffset;
        rectangles[i].y = mouseY - rectangles[i].yOffset;
      }
  
      // Display and check for interaction with each rectangle
      rect(rectangles[i].x, rectangles[i].y, boxSize, boxSize);
    }
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
