class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static fromAngle(r, dir) {
    let x = r * cos(dir);
    let y = r * sin(dir);
    return new Vector(x, y);
  }

  static rand() {
    let x = random(width);
    let y = random(height);
    return new Vector(x, y);
  }

  round(places = 0) {
    let val = pow(10, places);
    this.x = round(this.x * val)/val;
    this.y = round(this.y * val)/val;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  magnitude() {
    return sqrt(this.x*this.x + this.y * this.y);
  }

  direction() {
    return atan2(this.y, this.x);
  }

  setDirection(dir) {
    let r = this.magnitude();
    this.x = r * cos(dir);
    this.y = r * sin(dir);
  }

  setMagnitude(mag) {
    let m = this.magnitude();
    if (m === 0) {this.x = mag; this.y = 0; return;}
    this.x *= mag/m;
    this.y *= mag/m;
  }

  normalize() {
    this.setMagnitude(1);
  }

  plus(other) {
    let x = this.x + other.x;
    let y = this.y + other.y;
    return new Vector(x,y);
  }

  minus(other) {
    let x = this.x - other.x;
    let y = this.y - other.y;
    return new Vector(x,y);
  }

  times(scalar) {
    let x = this.x * scalar;
    let y = this.y * scalar;
    return new Vector(x,y);
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
}
