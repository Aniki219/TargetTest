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

    this.rb = new Rigidbody(this);
    this.rb.vel = Vector.fromAngle(speed, angle);
    this.rb.useGravity = false;
    this.rb.airfriction = 1;
    this.rb.friction = 0;

    this.sprite = new Sprite(kunaiImg, 1, 0, 32, 32, this);
  }

  move() {
    this.rb.move();
    this.destroy = (this.collider.right || this.collider.left ||
                    this.collider.up || this.collider.down);
  }
}
