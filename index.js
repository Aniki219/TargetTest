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
  background(200);
  rigidbodies.forEach((r) => r.update());
}

function update() {
  room.update();
  GameObject.Update();
}

function lateUpdate() {

}
