var rigidbodies = [];
var res = 0.1;

class Rigidbody {
  constructor(parent, x, y, w, h) {
    this.parent = parent;

    this.pos = new Vector(x, y);
    this.vel = new Vector(0,0);
    this.acc = new Vector(0,0);

    this.friction = 0.5;
    this.airfriction = 0.85;
    this.useGravity = true;
    this.grounded = false;

    this.forces = [];

    rigidbodies.push(this);
  }

  move() {
    this.vel.x *= (this.grounded) ? (1 - this.friction) : this.airfriction;
    this.acc = new Vector(0, 0);
    if (this.grounded) { this.vel.y = 0; };
    this.forces.forEach(f => this.acc.add(f));

    this.vel.add(this.acc);
    this.vel.round(1);

    let signx = sign(this.vel.x);
    for (let ux = abs(this.vel.x); ux >= 0; ux -= res) {
      let x = ux * signx;
      let newPos = this.pos.plus(new Vector(x, 0));
      if (placeFree(this.parent.collider, newPos)) {
        this.pos = newPos;
        ux = -1;
      }
    }

    let signy = sign(this.vel.y);
    for (let uy = abs(this.vel.y); uy >= 0; uy -= res) {
      let y = uy * signy;
      let newPos = this.pos.plus(new Vector(0, y));
      if (placeFree(this.parent.collider, newPos)) {
        this.pos = newPos;
        uy = -1;
      }
    }

    this.pos.round();
    return [this.pos.x, this.pos.y];
  }

  isGrounded() {
    return (!placeFree(this.parent.collider, this.pos.plus(new Vector(0, res))));
  }

  update() {
    this.forces = [];
    this.grounded = this.isGrounded();

    if (this.useGravity) {
      this.forces.push(gravity);
    }
  }

  addForce(arg1, arg2 = null) {
    if (arg1 instanceof Vector) {
      this.forces.push(arg1);
    } else {
      this.forces.push(new Vector(arg1, arg2));
    }
  }

  zero() {
    this.vel = Vector.zero();
    this.acc = Vector.zero();
  }
}
