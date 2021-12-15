class Level {
  constructor(layoutStr, name) {
    this.levelObjects = []
    this.name = name
    this.levelLayout = this.createLevel(layoutStr)
  
    this.moves = 0

    this.events = new EventTarget()

    this.completedEvent = new Event('completed')
  }

  createLevel(layoutStr) {
    return layoutStr
      .trim()
      .split('\n')
      .map((row, y) => {
        const cellStrArr = row.split('')

        for (let x = 0; x < cellStrArr.length; x++) {
          const cellStr = cellStrArr[x]

          const gameObj = { location: { x, y } }

          if (cellStr === 'P') {
            this.levelObjects.push(new Player(gameObj))
          } else if (cellStr === '#') {
            this.levelObjects.push(new Wall(gameObj))
          } else if (cellStr === 'O') {
            this.levelObjects.push(new Block(gameObj))
          } else if (cellStr === 'X') {
            this.levelObjects.push(new Goal(gameObj))
          }
        }

        return new Array(cellStrArr.length).fill('')
      })
  }

  moveObject(obj, movement) {
    const existingObjectsAtLocation = this.getObjectsAtLocation({
      x: obj.location.x + movement.x,
      y: obj.location.y + movement.y
    })

    if (obj instanceof Wall) {
      return false
    } else if (obj instanceof Block) {
      for (let index = 0; index < existingObjectsAtLocation.length; index++) {
        const existingObject = existingObjectsAtLocation[index]
        if (!(existingObject instanceof Goal)) return false
      }

      obj.move(movement)
      return true
    } else if (obj instanceof Player) {
      // Collision check.
      if (existingObjectsAtLocation.length > 0) {
        for (let index = 0; index < existingObjectsAtLocation.length; index++) {
          const existingObject = existingObjectsAtLocation[index];
          // Is it a block? Try this with the block first.
          const bool = this.moveObject(existingObject, movement)

          if (bool === false) {
            return false
          }
        }
      }

      // If no collision, move.
      obj.move(movement)
      this.moves++
      return true
    }
  }

  render() {
    let str = `
      <caption>
        <span>${this.name}${this.getWinState()}</span>
        <br>
        <small>Your moves: ${this.moves}</small>
      </caption>
    `

    str += '<tbody>';

    // Y
    for (let y = 0; y < this.levelLayout.length; y++) {
      const row = this.levelLayout[y]

      str += '<tr>'
      // X
      for (let x = 0; x < row.length; x++) {
        const objects = this.getObjectsAtLocation({ x, y })

        str += `<td>${objects[0] ? `<img src="${objects[0].image}" />` : ''}</td>`
      }

      str += '</tr>'
    }

    str += '</tbody>'

    return str
  }

  getObjectsAtLocation(location) {
    let res = []

    for (let index = 0; index < this.levelObjects.length; index++) {
      const obj = this.levelObjects[index]

      const sameX = obj.location.x === location.x
      const sameY = obj.location.y === location.y

      if (sameX && sameY) res.push(obj)
    }

    return res
  }

  getWinState () {
    let goals = 0
    let completed = 0
    for (let index = 0; index < this.levelObjects.length; index++) {
      const object = this.levelObjects[index]

      // Check if all goals have a block on top of them!
      if (object instanceof Goal) {
        goals++
        const onLocationObjects = this.getObjectsAtLocation({
          x: object.location.x,
          y: object.location.y
        })

        for (let index = 0; index < onLocationObjects.length; index++) {
          const obj = onLocationObjects[index]
          
          if (obj instanceof Block) completed++
        }
      }
    }

    const winBool = completed === goals

    if (winBool) {
      this.events.dispatchEvent(this.completedEvent)
    }

    return winBool ? ' You win!' : ''
  }
}
