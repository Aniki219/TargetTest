class Room {
  constructor() {
    this.loadLevel();
  }

  loadLevel() {
    for (let i = 0; i < level.length; i++) {
      if (!level[i]) { continue; }
      let data = level[i];
      new classes[data.type](data);
    }
  }

  update() {

  }
}
