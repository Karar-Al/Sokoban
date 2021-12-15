class Game {
  constructor (gameTable, controllerTable) {
    this.gameTable = gameTable
    this.controllerTable = controllerTable

    this.controller = null
    this.map = null
  }

  init (level) {
    this.map = level
    this.gameTable.innerHTML = level.render()

    this.controller = new Controller(this)
    this.controllerTable.innerHTML = this.controller.render()

    this.controller.initButtons()

    this.map.events.addEventListener('completed', () => {
      if (levels.length > 0) {
        this.init(levels.shift())
      }
    })
  }

  render () {
    this.gameTable.innerHTML = this.map.render()
  }
}

const game = new Game(document.getElementById('game'), document.getElementById('controller'))

game.init(levels.shift())
