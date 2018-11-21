class Sprite {
    constructor(imageData, numberOfFrames, frameSpeed, sourceWidth, sourceHeight, parent) {
        this.image = imageData;
        this.sw = sourceWidth;
        this.sh = sourceHeight;
        this.offset = Vector.zero();
        this.xscale = 1;
        this.yscale = 1;

        this.frame = 0;
        this.animationNumber = 0;
        this.numFrames = numberOfFrames || 1;
        this.frameSpeed = frameSpeed || 0;

        this.parent = parent;

        this.animationEnd = "repeat";
    }

    draw(x, y, w, h) {
        var sx = this.frame * this.sw;
        var sy = this.animationNumber * this.sh;
        push()
          scale(createVector(this.xscale,this.yscale));
          image(this.image, (x + this.offset.x)/(this.xscale), (y + this.offset.y)/(this.yscale), w*this.xscale, h*this.yscale, sx, sy, this.sw, this.sh);
        pop();
        this.animate();
    }

    animate() {
      if (frameCount % this.frameSpeed === 0) {
          this.frame++;
      }

      if (this.frame >= this.numFrames) {
        if (this.animationEnd == "repeat") {
          this.frame = 0;
        } else if (this.animationEnd == "stop") {
          this.frame = this.numFrames-1;
        } else {
          this.parent.changeState(this.animationEnd);
        }
      }
    }

    setAnimation(animationNumber, numFrames, frameSpeed, endStyle, startFrame = 0) {
      if (this.animationNumber == animationNumber) { return; }
      this.animationNumber = animationNumber;
      this.numFrames = numFrames;
      this.frameSpeed = frameSpeed;
      this.animationEnd = endStyle;
      this.frame = startFrame || 0;
    }
}
