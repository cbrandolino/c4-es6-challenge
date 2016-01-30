class Board {
  constructor() {
    this.initializeEmptyBoard();
    this._currentPlayer = 1;
  }
  initializeEmptyBoard() {
    const cols = Array.from({ length: 7 },
      () => Array(6).fill(0));
    this.state = cols;
  }
  changePlayer() {
    this._currentPlayer = this.nextPlayer;
    return this._currentPlayer;
  }

  play(col) {
    const column = this.state[col];
    const row = column.findIndex((cell) => cell === 0);
    return (row !== undefined) ? this.completeMove(col, row) : { col, row, value: 0 };
  }

  checkVector(centerX, centerY, changeX, changeY, length = 7) {
    let x = centerX - changeX * 4;
    let y = centerY - changeY * 4;
    let consecutiveMarbles = 0;
    for (let step = 0; step < length; step++) {
      x += changeX;
      y += changeY;
      if (this.cellValue(x, y) !== this.currentPlayer) {
        consecutiveMarbles = 0;
        continue;
      }
      consecutiveMarbles ++;
      if (consecutiveMarbles === 4) {
        return true;
      }
    }
    return false;
  }

  completeMove(col, row, player = this.currentPlayer) {
    const oldState = this.state;
    oldState[col][row] = player;
    this.state = oldState;
    this.changePlayer();
    return { col, row, player };
  }

  cellValue(x, y) {
    console.log('x:', x, ', y: ', y)
    try {
      console.log(this.state[y][x]);
      return this.state[y][x];
    } catch (e) {
      return undefined;
    }
  }

  set state(val) {
    this._state = val;
    return this._state;
  }

  get state() {
    return this._state;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }
  get nextPlayer() {
    return - this.currentPlayer;
  }
}

export default Board;
