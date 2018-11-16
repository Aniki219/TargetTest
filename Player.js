var player;
var res = 0.1;

class Player extends GameObject{
  constructor(data) {
    super(data);
    this.w = 32;
    this.h = 48;
    this.speed = .5;
    this.depth = 1;

    this.rb = new Rigidbody(this, this.x, this.y, this.w, this.h);

    player = this;
  }

  move() {
    if (register[LEFT_ARROW] || getKey('W')) {
      this.rb.addForce(new Vector(-this.speed, 0));
    }
    if (register[RIGHT_ARROW] || getKey('D')) {
      this.rb.addForce(new Vector(this.speed, 0));
    }
    [this.x, this.y] = this.rb.move();
  }

  update() {
    this.draw();
    this.move();
  }
}
