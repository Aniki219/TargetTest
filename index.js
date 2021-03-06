var room;
var targets;
var timer = 0;

var classes = {
  'Vector': Vector,
  'Wall': Wall,
  'Support': Support,
  'Player': Player,
  'Target': Target,
}

function setup() {
  let canvas = createCanvas(640,480);
  $("#defaultCanvas0").css("width", 960);
  $("#defaultCanvas0").css("height", 720);
  $("#defaultCanvas0").center();
  room = new Room();
}

function draw() {
  push()
    translate(constrain(width/2-player.x,-1152+width,0), constrain(height/2-player.y,-800+height,0));
    earlyUpdate();
    update();
    lateUpdate();
  pop();
  targets = gameObjects.filter(go => go instanceof Target).length;
  if (targets > 0) timer++;
  drawUI();
}

function earlyUpdate() {
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
}

function drawUI() {
  fill(255);
  text(player.state,10,10);
  text("Time:" + timer, 10, 50);
  text("Targets:" + targets, 10, 30);
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}
