class Target extends GameObject {
  constructor(data) {
    super(data)
    this.collider = new Collider({x:3, y:3, w:26, h:26});
    this.sprite = new Sprite(targetImg, 1, 0, 32, 32, this);
  }

  update() {
    super.update();
    if (touching(this.collider, Kunai)) {
      this.destroy = true;
    }
  }
}
