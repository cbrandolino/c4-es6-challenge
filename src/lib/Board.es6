class Board {
  constructor() {
    this.initializeEmptyBoard();
    this._currentPlayer = 1;
    this._possibleDirections = [[0, 1], [1, 0], [1, 1], [-1, 1]];
    this._winner = 0;
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

  checkVictory(x, y) {
    for (const [changeX, changeY] of this._possibleDirections) {
      if (this.checkVector(x, y, changeX, changeY)) {
        this.winner = this.currentPlayer;
        return true;
      }
    }
    return false;
  }

  completeMove(col, row, player = this.currentPlayer) {
    const oldState = this.state;
    oldState[col][row] = player;
    this.state = oldState;
    this.checkVictory(col, row);
    this.changePlayer();
    return { col, row, player };
  }

  cellValue(x, y) {
    try {
      return this.state[y][x];
    } catch (e) {
      return undefined;
    }
  }

  get winner() {
    return this._winner;
  }

  set winner(val) {
    this._winner = val;
    return this._winner;
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
