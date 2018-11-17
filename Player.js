var player;

class Player extends GameObject{
  constructor(data) {
    super(data);
    this.w = 32;
    this.h = 48;
    this.speed = 2;
    this.jumpHeight = 8;
    this.jumpSpeed = 0;
    this.depth = -1;

    this.rb = new Rigidbody(this, this.x, this.y, this.w, this.h);

    this.sprite = new Sprite(playerImg, 17, 4, 25, 33);
    this.sprite.animationNumber = 5;

    player = this;
  }

  setJumpHeight(val) {
    this.jumpHeight = val;
  }

  draw() {
    this.sprite.draw(this.x, this.y, this.w, this.h);
  }

  move() {
    if (register[LEFT_ARROW] || getKey('A')) {
      this.rb.addForce(new Vector(-this.speed, 0));
    }
    if (register[RIGHT_ARROW] || getKey('D')) {
      this.rb.addForce(new Vector(this.speed, 0));
    }
    if (register[UP_ARROW] || getKey('W')) {
      if (this.rb.isGrounded()) {
        this.rb.addForce(new Vector(0, -this.jumpHeight));
        this.jumpSpeed = this.jumpHeight;
      }
    } else {
      this.jumpSpeed = 0;
    }
    if (this.jumpSpeed > 0) {
      this.rb.addForce(new Vector(0,-.75*(this.jumpSpeed/this.jumpHeight)));
      this.jumpSpeed--;
    }
    [this.x, this.y] = this.rb.move();
  }
}
