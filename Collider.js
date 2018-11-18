class Collider {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;

    this.solid = false;
    this.oneway = false;

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  draw() {
    noFill();
    strokeWeight(2);
    (this.right)?stroke(255,0,0):stroke(0,255,0);
    line(this.x+this.w, this.y, this.x+this.w, this.y+this.h);
    (this.left)?stroke(255,0,0):stroke(0,255,0);
    line(this.x, this.y, this.x, this.y+this.h);
    (this.down)?stroke(255,0,0):stroke(0,255,0);
    line(this.x, this.y+this.h, this.x+this.w, this.y+this.h);
    (this.up)?stroke(255,0,0):stroke(0,255,0);
    line(this.x, this.y, this.x+this.w, this.y);
    strokeWeight(1);
  }

  checkTouching() {
    this.right = !placeFree(this, new Vector(this.x+1, this.y));
    this.left = !placeFree(this, new Vector(this.x-1, this.y));
    this.down = !placeFree(this, new Vector(this.x, this.y+1));
    this.up = !placeFree(this, new Vector(this.x, this.y-1));
  }
}
