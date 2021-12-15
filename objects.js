class Wall extends GameObject {
  constructor (obj) {
    super(obj.location)
    this.image = './img/wall.jpg'
  }
}

class Block extends GameObject {
  constructor (obj) {
    super(obj.location)
    this.image = './img/crate.png'
  }
}

class Goal extends GameObject {
  constructor (obj) {
    super(obj.location)
    this.image = './img/goal.png'
  }
}

class Player extends GameObject {
  constructor (obj) {
    super(obj.location)
    this.image = './img/player.png'
  }
}
