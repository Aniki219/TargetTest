var rigidbodies = [];

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
    this.vel.mult(1 - this.friction);
    this.vel.add(this.acc);

    let signx = sign(this.vel.x);
    let signy = sign(this.vel.y);
    for (let ux = abs(this.vel.x); ux >= 0; ux -= res) {
      for (let uy = abs(this.vel.y); uy >= 0; uy -= res) {
        let x = ux * signx;
        let y = uy * signy;
        let newPos = this.pos.plus(new Vector(x,y));
        if (placeFree(this.parent, newPos)) {
          this.pos = newPos;
          ux = -1;
          uy = -1;
          break;
        }
      }
    }

    this.acc = new Vector(0,0);
    this.forces.forEach(f => this.acc.add(f));
    // if (this.forces.length>1)console.log(this.forces)

    if (placeFree(this.parent, this.pos.plus(new Vector(0, res)))) {
      //this.acc.add(gravity);
    }else{
      this.vel.y = 0;
    }

    return [this.pos.x, this.pos.y];
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
