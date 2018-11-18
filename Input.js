var register = {};
register.pressed = {};

function registerUpdate() {
  register.pressed = false;
}

function keyPressed() {
  register[keyCode] = true;
  register.pressed[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}

function getKey(name) {
  return (register[name.charCodeAt(0)]);
}

function mousePressed() {
  if (mouseOnScreen()) {
    register["mouse" + mouseButton] = true;
  }
}

function mouseReleased() {
  register["mouse" + mouseButton] = false;
}

function mouseOnScreen() {
  return (mouseX < width && mouseX >= 0 && mouseY >= 0 && mouseY < height);
}
