class GameObject {
  constructor (location) {
    this.location = location
    this.image = '?'
  }

  // { x: -1, y: 1 }
  move ({ x, y }) {
    this.location.x += x
    this.location.y += y
  }
}