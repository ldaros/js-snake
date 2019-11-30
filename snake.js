class Snake {

  constructor() {
    this.len = 0;
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
  }

  // updates the snake position
  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  // draws the snake on screen
  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }

  // sets the movement direction
  // UP    =  0, -1
  // DOWN  =  0,  1
  // LEFT  = -1,  0
  // RIGHT =  1,  0
  setDir(x, y) {
    snake.xdir = x;
    snake.ydir = y;
  }

  // checks the losing conditions
  isDead() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  // eat
  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x == pos.x && y == pos.y) {
      print("Food Eaten");
      this.grow();
      return true;
    }
    return false;
  }

  // makes small snake become big snake
  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }
}
