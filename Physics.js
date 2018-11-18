var gravity = new Vector(0,.4);

function placeFree(collider, vector) {
  let objRect = {x: vector.x, y: vector.y, w: collider.w, h: collider.h};
  let free = true;

  solids().forEach((s) => {
    if (collision(objRect, s.collider)) {
      free = false;
    }
  })
  return free;
}

function collision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
        return true;
      }
  return false;
}

function solids() {
  return gameObjects.filter((go) => {return go.solid})
}

function sign(num) {
  return (num >= 0)?1:-1;
}
