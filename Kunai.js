class Kunai extends GameObject {
  constructor(x, y, angle, speed) {
    super({
      x: x,
      y: y,
      w: 32,
      h: 32,
      angle: angle+PI/4
    });
    this.collider.w = 15;
    this.collider.h = 15;
    this.collider.origin = new Vector(9,8);

    this.vel = Vector.fromAngle(speed, angle);

    this.sprite = new Sprite(kunaiImg, 1, 0, 32, 32, this);
  }

  move() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.collider.x = this.x;
    this.collider.y = this.y;
    this.destroy = (this.collider.right || this.collider.left ||
                    this.collider.top || this.collider.bottom);
  }
}
