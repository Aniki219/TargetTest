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
    this.angle = data.angle || 0;

    this.solid = false;
    this.depth = 0;
    this.destroy = false;

    this.collider = new Collider({x: this.x, y: this.y, w: this.w, h: this.h})

    gameObjects.push(this);
  }

  draw() {
    noStroke();

    if (this.angle != 0) {
      push();
        translate(this.x+this.collider.w/2, this.y+this.collider.h/2);
        rotate(this.angle);
        this.draw2(-this.collider.w/2, -this.collider.h/2);
      pop();
    } else { this.draw2(this.x, this.y); }
  }

  draw2(xx, yy) {
    xx -= this.collider.origin.x;
    yy -= this.collider.origin.y;
    if (this.sprite) {
      this.sprite.draw(xx, yy, this.w, this.h);
    } else if (this.src) {
      image(imagesArray[this.src], xx, yy, this.w, this.h, this.sx, this.sy, this.sw, this.sh)
    } else if (this.clr) {
      fill(...this.clr.levels);
      rect(xx, yy, this.w, this.h);
    }
  }

  move() {

  }

  earlyUpdate() {

  }

  update() {
    this.collider.checkTouching();
    this.draw();
    this.move();

    if (this.oneway) {
      this.solid = (player.rb.vel.y >= 0 && player.y + player.h <= this.y);
    }
  }

  static Update() {
    gameObjects = gameObjects.filter(o => !o.destroy);
    gameObjects = gameObjects.sort((a,b) => (a.depth>b.depth)?-1:1);
    gameObjects.forEach(o => {o.update();});
  }
}
