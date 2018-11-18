var room;

var classes = {
  'Vector': Vector,
  'Wall': Wall,
  'Support': Support,
  'Player': Player,
}

function setup() {
  createCanvas(640,480);
  room = new Room();
}

function draw() {
  earlyUpdate();
  update();
  lateUpdate();
}

function earlyUpdate() {
  background(0,100,150);
  rigidbodies.forEach((r) => r.update());
  gameObjects.forEach(o => {o.earlyUpdate();});
}

function update() {
  room.update();
  GameObject.Update();
}

function lateUpdate() {
  register.pressed = {};
}
