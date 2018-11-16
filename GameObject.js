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

    this.solid = false;
    this.depth = 0;
    this.destroy = false;

    gameObjects.push(this);
  }

  draw() {
    noStroke();
    fill(...this.clr.levels);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {

  }

  earlyUpdate() {}

  update() {
    this.draw();
    this.move();
  }

  static Update() {
    gameObjects.filter(o => !o.destroy);
    gameObjects.sort((a,b) => (a.depth>b.depth)?-1:1);
    gameObjects.forEach(o => o.update())
  }
}
