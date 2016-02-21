import { EventEmitter } from 'events';

class BoardModel extends EventEmitter {

  constructor(state = null) {
    super();
    this.state = state || this.initializeEmptyBoard();
    this.validColumns = [...this.state.keys()];
    this._currentPlayer = 1;
    this._possibleDirections = [[0, 1], [1, 0], [1, 1], [-1, 1]];
    this._winner = 0;
  }

  exception(message) {
    this.message = message;
    this.name = 'BoardException';
  }

  initializeEmptyBoard() {
    return Array.from({ length: 7 },
      () => Array(6).fill(0));
  }

  changePlayer() {
    this._currentPlayer = this.nextPlayer;
    return this._currentPlayer;
  }

  play(col) {
    if (this.fullBoard) {
      throw this.exception('Board is full');
    }
    if (this.validColumns.indexOf(col) === -1) {
      throw this.exception('Column is full');
    }
    const player = this.currentPlayer;
    const row = this.firstEmptyRow(col);
    this.swapCell(row, col, player);
    const victory = this.checkVictory(row, col);
    this.changePlayer();
    return { col, row, player, victory };
  }

  swapCell(row, col, player) {
    this._state[col][row] = player;
  }

  firstEmptyRow(col) {
    const cells = this.state[col];
    const freeCell = cells.findIndex((cell) => cell === 0);
    if (freeCell === cells.length - 1) {
      this.validColumns.splice(col, 1);
    }
    if (this.validColumns.length === 0) {
      this.fullBoard = true;
      this.events.emit('fullBoard');
    }
    return freeCell;
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

  checkVictory(row, col) {
    for (const [changeRow, changeCol] of this._possibleDirections) {
      if (this.checkVector(row, col, changeRow, changeCol)) {
        this.winner = this.currentPlayer;
        return true;
      }
    }
    return false;
  }

  cellValue(x, y) {
    try {
      return this.state[y][x];
    } catch (e) {
      return undefined;
    }
  }

  loop(callback) {
    for (const [col, colRows] of this.state.entries()) {
      for (const row in colRows) {
        callback({ row, col, value: this.cellValue(row, col) });
      }
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

  get fullBoard() {
    return this._fullBoard;
  }

  set fullBoard(full) {
    this._fullBoard = full;
    return this._fullBoard;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }
  get nextPlayer() {
    return - this.currentPlayer;
  }
}

export default BoardModel;
