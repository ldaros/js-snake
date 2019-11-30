let snake
let rez = 20;
let food;
let w;
let h;
let currentdirection = "";
let synth = new p5.MonoSynth();

//starts things
function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(8);
  snake = new Snake();
  foodLocation();
}

//create a new random location for the food
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

//inputs
function keyPressed() {
  if (keyCode == UP_ARROW && (currentdirection != "DOWN" || snake.body.length == 1)) {
    snake.setDir(0, -1);
    currentdirection = "UP";

  } else if (keyCode == DOWN_ARROW && (currentdirection != "UP" || snake.body.length == 1)) {
    snake.setDir(0, 1);
    currentdirection = "DOWN";

  } else if (keyCode == LEFT_ARROW && (currentdirection != "RIGHT" || snake.body.length == 1)) {
    snake.setDir(-1, 0);
    currentdirection = "LEFT";

  } else if (keyCode == RIGHT_ARROW && (currentdirection != "LEFT" || snake.body.length == 1)) {
    snake.setDir(1, 0);
    currentdirection = "RIGHT";
    //secret key
  } else if (key == 'Z') {
    snake.grow();
  }
  //restarts the game
  if (key == 'R' || key == 'r') {
    setup();
    loop();
    draw();
    synth.play("A6", 0.8, 0, 0.25);
  }
}

function draw() {
  scale(rez);
  background(220);

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);

  if (snake.eat(food)) {
    foodLocation();
    synth.play("C6", 0.8, 0, 0.25);
  }

  snake.update(); //moves the snake
  snake.show(); //draws the snake

  //game over screen
  if (snake.isDead()) {
    print("Game Over - F");
    synth.play("G3", 0.8, 0, 0.25);
    background(255, 0, 0);
    textSize(1);
    textAlign(CENTER, CENTER);
    text("Game Over\nPress R to Restart", w / 2, h / 2);
    text("Score: " + snake.body.length, w / 2, h - 1)
    noLoop();
  }
  //victory screen
  if (snake.len == w * h) {
    background(0, 255, 0);
    print("Game Over - V");
    noLoop();
  }

}
