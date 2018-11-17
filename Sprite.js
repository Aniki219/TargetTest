class Sprite {
    constructor(imageData, numberOfFrames, frameSpeed, sourceWidth, sourceHeight) {
        this.image = imageData;
        this.sw = sourceWidth;
        this.sh = sourceHeight;

        this.frame = 0;
        this.animationNumber = 0;
        this.numFrames = numberOfFrames || 1;
        this.frameSpeed = frameSpeed || 0;
    }

    draw(x, y, w, h) {
        var sx = this.frame * this.sw;
        var sy = this.animationNumber * this.sh;

        image(this.image, x, y, w, h, sx, sy, this.sw, this.sh);
        this.animate();
    }

    animate() {
        if (frameCount % this.frameSpeed === 0) {
            this.frame++;
        }

        if (this.frame >= this.numFrames) {
            this.frame = 0;
        }
    }
}

function preload() {
  playerImg = loadImage("playerImg.png");
}
