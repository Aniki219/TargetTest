var player;

class Player extends GameObject{
  constructor(data) {
    super(data);
    this.pos = new Vector(data.x, data.y);
    this.vel = new Vector(0,0);
    this.acc = new Vector(0,0);

    this.w = 32;
    this.h = 48;

    player = this;
  }

  move() {

  }

  update() {
    this.draw();
    this.move();
  }
}
