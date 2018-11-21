var gravity = new Vector(0,.4);

function placeFree(collider, vector) {
  let objRect = {x: vector.x, y: vector.y, w: collider.w, h: collider.h};
  let free = true;

  let testagainst = gameObjects.filter((s) => (s.solid && ((s.x-vector.x)*(s.x-vector.x)+(s.y-vector.y)*(s.y-vector.y))<10000));
  testagainst.forEach((s) => {
    if (collision(objRect, s.collider)) {
      free = false;
    }
  })
  return free;
}

function collision(rect1, rect2) {
  if (rect1.x >= rect2.x + rect2.w) {return false;}
  if (rect1.x + rect1.w <= rect2.x) {return false;}
  if (rect1.y >= rect2.y + rect2.h) {return false;}
  if (rect1.y + rect1.h <= rect2.y) {return false;}
  return true;
}

function solids() {
  return gameObjects.filter((go) => {return go.solid})
}

function sign(num) {
  return (num >= 0)?1:-1;
}

function touching(obj, type) {
  let objs = gameObjects.filter(g => g instanceof type);
  for (let o of objs) {
    if (collision(obj, o)) {return true;}
  }
  return false;
}
