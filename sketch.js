let snake
let rez = 20;
let food;
let w;
let h;
let synth = new p5.MonoSynth();

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(8);
  snake = new Snake();
  foodLocation();

}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    snake.setDir(0, -1);

  } else if (keyCode == DOWN_ARROW) {
    snake.setDir(0, 1);

  } else if (keyCode == LEFT_ARROW) {
    snake.setDir(-1, 0);

  } else if (keyCode == RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (key == 'D') {
    snake.grow();
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
    synth.play("A6",0.8,0,0.25);
  }

  snake.update();
  snake.show();

  if (snake.isDead()) {
    print("Game Over - F");
    synth.play("G3",0.8,0,0.25);
    background(255, 0, 0);
    noLoop();
  }

  if (snake.len == w * h) {
    background(0, 255, 0);
    print("Game Over - V");
    noLoop();
  }

}
