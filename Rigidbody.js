var rigidbodies = [];
var res = 0.1;

class Rigidbody {
  constructor(parent, x, y, w, h) {
    this.parent = parent;

    this.pos = new Vector(x, y);
    this.vel = new Vector(0,0);
    this.acc = new Vector(0,0);

    this.friction = 0.5;
    this.useGravity = true;

    this.forces = [];

    rigidbodies.push(this);
  }

  move() {
    this.vel.x *= (1 - this.friction);
    this.acc = new Vector(0, 0);
    if (this.isGrounded()) { this.vel.y = 0; };
    this.forces.forEach(f => this.acc.add(f));

    this.vel.add(this.acc);
    this.vel.round(1);

    let signx = sign(this.vel.x);
    for (let ux = abs(this.vel.x); ux >= 0; ux -= res) {
      let x = ux * signx;
      let newPos = this.pos.plus(new Vector(x, 0));
      if (placeFree(this.parent, newPos)) {
        this.pos = newPos;
        ux = -1;
      }
    }

    let signy = sign(this.vel.y);
    for (let uy = abs(this.vel.y); uy >= 0; uy -= res) {
      let y = uy * signy;
      let newPos = this.pos.plus(new Vector(0, y));
      if (placeFree(this.parent, newPos)) {
        this.pos = newPos;
        uy = -1;
      }
    }

    this.pos.round();
    return [this.pos.x, this.pos.y];
  }

  isGrounded() {
    return (!placeFree(this.parent, this.pos.plus(new Vector(0, res))));
  }

  update() {
    this.forces = [];

    if (this.useGravity) {
      this.forces.push(gravity);
    }
  }

  addForce(f) {
    this.forces.push(f);
  }
}
