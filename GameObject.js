var gameObjects = [];

class GameObject {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;

    this.clr = data.clr;
    this.src = data.src;
    this.sx = data.sx;
    this.sy = data.sy;
    this.sw = data.sw;
    this.sh = data.sh;

    gameObjects.push(this);
  }

  draw() {
    noStroke();
    fill(...this.clr.levels);
    rect(this.x, this.y, this.w, this.h);
  }

  static Update() {
    gameObjects.forEach((o) => o.draw())
  }
}
