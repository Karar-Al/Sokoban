class Controller {
  constructor (game) {
    this.game = game

    this.object = this.game.map.levelObjects.find(obj => obj instanceof Player)
  }

  move (direction) {
    if (direction === 'up') {
      this.game.map.moveObject(this.object, { x: 0, y: -1 })
    } else if (direction === 'down') {
      this.game.map.moveObject(this.object, { x: 0, y: 1 })
    } else if (direction === 'left') {
      this.game.map.moveObject(this.object, { x: -1, y: 0 })
    } else if (direction === 'right') {
      this.game.map.moveObject(this.object, { x: 1, y: 0 })
    }

    this.game.render()
  }

  render () {
    let str = '<tbody>';

    str += `
      <tr>
        <td></td>
        <td>
          <button data-move="up">&uarr;</button>
        </td>
        <td></td>
      </tr>
    `

    str += `
      <tr>
        <td>
          <button data-move="left">&larr;</button>
        </td>
        <td></td>
        <td>
          <button data-move="right">&rarr;</button>
        </td>
      </tr>
    `

    str += `
      <tr>
        <td></td>
        <td>
          <button data-move="down">&darr;</button>
        </td>
        <td></td>
      </tr>
    `

    str += '</tbody>'

    return str
  }

  initButtons () {
    const moveButtons = document.querySelectorAll('button[data-move]')

    for (let index = 0; index < moveButtons.length; index++) {
      const button = moveButtons[index]
      
      // Arrows funktioner! Vi vill ej binda function() this till något annat än nuvarande this scope.
      button.onclick = () => this.move(button.dataset.move)
    }
  }
}