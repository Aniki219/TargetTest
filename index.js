var room;

var classes = {
  'Vector': Vector,
  'Wall': Wall,
  'Support': Support,
  'Player': Player,
}

function setup() {
  createCanvas(960,640);
  room = new Room();
}

function draw() {
  earlyUpdate();
  update();
  lateUpdate();
}

function earlyUpdate() {
  //background(0,100,150);
  image(moonBackground, -50*player.x/width,10*player.y/height);
  rigidbodies.forEach((r) => r.update());
  gameObjects.forEach(o => {o.earlyUpdate();});
}

function update() {
  room.update();
  GameObject.Update();
}

function lateUpdate() {
  register.pressed = {};
  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}
