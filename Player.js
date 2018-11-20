var BACKDRIFT_PENALTY = 0.9;
var THROW_COOLDOWN = 25;
var WALLJUMP_DECAY = 1;
var MAXWALL_JUMPS = 5000;
var MOVEABLE_STATES = ["move", "jump", "fall", "land", "wallslide", "airChargeThrow"];
var PHYSICS_STATES = [...MOVEABLE_STATES, "createKnife", "airWaitAnim"];
var THROWABLE_STATES = ["move", "jump", "fall"];
var PLAYER_SCALE = 1.25;
var player;

class Player extends GameObject{
  constructor(data) {
    super(data);
    this.w = 48 * PLAYER_SCALE;
    this.h = 48 * PLAYER_SCALE;

    this.collider.w = round(17 * PLAYER_SCALE);
    this.collider.h = round(34 * PLAYER_SCALE);
    this.collider.origin = new Vector(round(14 * PLAYER_SCALE), round(13 * PLAYER_SCALE));

    this.speed = 2;
    this.jumpHeight = 9;
    this.jumpSpeed = 0;

    this.walljumps = 0;
    this.doublejump = true;
    this.highfall = false;

    this.rb = new Rigidbody(this);

    this.facing = 1;
    this.depth = -1;
    this.sprite = new Sprite(playerImg, 4, 20, 48, 48, this);
    this.sprite.animationNumber = 0;

    this.state = "move";

    this.throwCooldown = 0;
    this.chargeValue = 0;
    this.inverted = false;

    player = this;
  }

  update() {
    super.update();

    if (this.rb.grounded) {
      this.walljumps = 0;
      this.doublejump = true;
    }
    this.throw();
    this.animate();
    this.effects();

    if (PHYSICS_STATES.includes(this.state)) { this.rb.move(); }
  }

  throw() {
    this.throwCooldown--;
    if (getKey("S") && this.throwCooldown <= 0 && THROWABLE_STATES.includes(this.state)) {
      if (this.rb.grounded) {
        this.changeState("chargeThrow");
      } else {
        this.changeState("airChargeThrow");
      }
    }
  }

  effects() {
    //facing
    this.sprite.xscale = this.facing;

    //charge effect
    if (this.chargeValue > 10 && this.chargeValue % 2) {
      playerImg.filter(INVERT);
      this.inverted = !this.inverted;
    }
    if (!this.state.includes("Throw") && this.inverted) {
      playerImg.filter(INVERT);
      this.inverted = !this.inverted;
    }
  }

  animate() {

    if (this.state == "jump") {
      if (this.doublejump) {
        this.sprite.setAnimation(2, 1, 0, "stop");
      } else {
        this.sprite.setAnimation(4, 2, 4, "stop");
      }
      if (this.rb.vel.y >= 0) {
        this.changeState("fall");
      }
    }
    if (this.state == "fall") {
      if (this.rb.grounded) { this.changeState("land"); }
      if (this.collider.right && register[RIGHT_ARROW]) {
        this.facing = -1;
        this.changeState("wallslide");
      } else if (this.collider.left && register[LEFT_ARROW]) {
        this.facing = 1;
        this.changeState("wallslide");
      } else {
        this.sprite.setAnimation(3, 6, 4, "stop");
      }
    }
    if (this.state == "wallslide") {
      this.sprite.setAnimation(8, 1, 0, "stop");
      this.rb.vel.y = min(this.rb.vel.y, 2);
      if (
        (this.collider.right && register[LEFT_ARROW]) ||
        (this.collider.left && register[RIGHT_ARROW]) ||
        !(this.collider.right || this.collider.left)
       ) {
         this.changeState("fall");
       }
      if (this.rb.grounded) { this.changeState("move"); }
    }
    if (this.state == "land") {
      { this.sprite.setAnimation(5,2,6,"move"); }
    }
    if (this.state == "move") {
      if (!this.collider.down) {
        this.changeState("fall");
      }
      if (abs(this.rb.vel.x) >= 1) {
        //running
        this.sprite.setAnimation(1, 17, 3, "repeat");
      } else {
        //standing
        this.sprite.setAnimation(0, 4, 24, "repeat");
      }
    }
    if (this.state == "chargeThrow") {
      if (!this.rb.grounded) { this.changeState("airChargeThrow"); }
      this.chargeThrow(9);
    }
    if (this.state == "airChargeThrow") {
      if (this.rb.grounded) { this.changeState("chargeThrow"); }
      this.chargeThrow(11);
    }
    if (this.state == "throw" || this.state == "airThrow") {
      this.sprite.numFrames = 3;
      this.sprite.frameSpeed = 4;
      this.sprite.animationEnd = "move";
      this.sprite.frame = 1;
      if (this.sprite.frame == 1) { this.throwKnife(); }
    }
  }

  throwKnife() {
    this.changeState("createKnife");
    this.throwCooldown = THROW_COOLDOWN;

    let knifeAngle = 0;

    if (register[UP_ARROW]) { knifeAngle = -PI/2; }
    if (register[DOWN_ARROW]) { knifeAngle = PI/2; }
    if (this.facing == 1 && register[RIGHT_ARROW] || this.facing==-1 && register[LEFT_ARROW]) {knifeAngle /= 2}
    if (this.facing == -1) { knifeAngle = PI - knifeAngle; }
    let xx = 15*cos(knifeAngle) + ((this.facing==-1)?4:10);
    let yy = 15*sin(knifeAngle) + 2;
    new Kunai(this.x + xx, this.y + yy, knifeAngle, 20);
    if (this.rb.grounded) {
      this.changeState("waitAnim");
    } else if (this.chargeValue > 10) {
      this.changeState("airWaitAnim");
      this.rb.zero();
      this.rb.addForce(Vector.fromAngle(6, PI + knifeAngle));
    }
    this.chargeValue = 0;
  }

  changeState(state) {
    this.state = state;
  }

  chargeThrow(num) {
    if (this.rb.grounded || this.chargeValue < 10) {
      if (register[LEFT_ARROW]) { this.facing = -1; }
      if (register[RIGHT_ARROW]) { this.facing = 1; }
    }
    if (getKey("S")) {
      this.chargeValue++;
      this.sprite.setAnimation(num, 1, 0, "stop");
    } else {
      this.changeState("throw")
    }
  }

  move() {
    if (!MOVEABLE_STATES.includes(this.state)) {return;}
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
  }

  jump() {
    //ground jump
    if (this.rb.grounded) {
      if (register.pressed["A".charCodeAt(0)]) {
        this.rb.addForce(new Vector(0, -this.jumpHeight));
        this.changeState("jump");
      }
    } else {
      //airborn
      if (this.walljumps < MAXWALL_JUMPS && (register[LEFT_ARROW] || register[RIGHT_ARROW] || this.state == "wallslide")) {
        //touching right wall
        if (this.collider.right && !this.collider.left) { this.wallJump(-1); return; }
        //touching left wall
        if (!this.collider.right && this.collider.left) { this.wallJump(1); return; }
      }
      //if no walljump
      if (this.doublejump) {
        if (register.pressed["A".charCodeAt(0)]) {
          this.doublejump = false;
          if (register[RIGHT_ARROW]) { this.facing = 1; }
          if (register[LEFT_ARROW]) { this.facing = -1; }
          this.rb.vel.y = 0;
          this.rb.addForce(new Vector(0, -this.jumpHeight/1.5));
          this.changeState("jump");
        }
      }
      //touching top wall
      if (this.collider.up) { this.rb.vel.y *= 0.75; }
    }
  }

  wallJump(dir = 1) {
    if (register.pressed["A".charCodeAt(0)]) {
      this.rb.zero();
      this.rb.addForce(new Vector(5*dir, -7*pow(WALLJUMP_DECAY, this.walljumps)));
      this.facing = dir;
      this.walljumps++;
      this.changeState("jump");
    }
  }

  variableJump() {
    if (!register["A".charCodeAt(0)]) {
      this.rb.vel.y = max(-3, this.rb.vel.y);
    }
  }
}
