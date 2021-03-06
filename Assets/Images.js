function preload() {

  var prefix = "https://raw.githubusercontent.com/Aniki219/TargetTest/master/"

  imagesArray = {
    'images/castleSmartTile.png' : loadImage(prefix + 'images/castleSmartTile.png'),
    'images/castleTileSet.png' : loadImage(prefix + 'images/castleTileset.png'),
    'images/grassSmartTile.png' : loadImage(prefix + 'images/grassSmartTile.png'),
  }
  playerImg = loadImage(prefix + "images/playerImg.png");
  moonBackground = loadImage(prefix + "images/moonBackground.png");
  kunaiImg = loadImage(prefix + "images/kunai.png")
  targetImg = loadImage(prefix + "images/target.png")
}
