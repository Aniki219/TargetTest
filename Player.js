var BACKDRIFT_PENALTY = 0.9;
var player;

class Player extends GameObject{
  constructor(data) {
    super(data);
    this.w = 32;
    this.h = 48;
    this.collider.h = 48;
    this.speed = 2;
    this.jumpHeight = 7;
    this.jumpSpeed = 0;
    this.depth = -1;
    this.walljumps = 3;

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

  update() {
    super.update();
    if (this.rb.grounded) {
      this.walljumps = 0;
    }
  }

  move() {
    let xspeed = this.rb.grounded ? this.speed : this.speed / 4;
    if (register[LEFT_ARROW]) {
      if (this.rb.grounded) {this.facing = -1;}
      if (this.facing == 1) {xspeed *= BACKDRIFT_PENALTY;}
      this.rb.addForce(new Vector(-xspeed, 0));
    }
    if (register[RIGHT_ARROW]) {
      if (this.rb.grounded) {this.facing = 1;}
      if (this.facing == -1) {xspeed *= BACKDRIFT_PENALTY;}
      this.rb.addForce(new Vector(xspeed, 0));
    }
    this.jump();
    this.variableJump();
    [this.x, this.y] = this.rb.move();
    this.collider.x = this.x;
    this.collider.y = this.y;
  }

  jump() {
    if (this.rb.isGrounded()) {
      if (register.pressed["A".charCodeAt(0)]) {
        this.rb.addForce(new Vector(0, -this.jumpHeight));
        this.jumpSpeed = this.jumpHeight;
      }
    } else {
      //airborn
      //touching right wall
      if (this.collider.right && !this.collider.left) { this.wallJump(-1) };
      //touching left wall
      if (!this.collider.right && this.collider.left) { this.wallJump(1) };
    }
  }

  wallJump(dir = 1) {
    if (register.pressed["A".charCodeAt(0)]) {
      this.rb.zero();
      this.rb.addForce(new Vector(this.speed*3*dir, -this.jumpHeight*0.9));
      this.facing = dir;
    }
  }

  variableJump() {
    if (!register["A".charCodeAt(0)]) {
      this.jumpSpeed = 0;
    }
    if (this.jumpSpeed > 0) {
      this.rb.addForce(new Vector(0,-.75*(this.jumpSpeed/this.jumpHeight)));
      this.jumpSpeed--;
    }
  }
}
