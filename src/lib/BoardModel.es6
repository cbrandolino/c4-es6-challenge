import { EventEmitter } from 'events';

class BoardModel {

  constructor() {
    Object.assign(this, new EventEmitter());
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
    if (this.fullBoard) {
      throw new Exception('Board is full');
    }
    const column = this.state[col];
    const freeRow = column.findIndex((cell) => cell === 0);
    if (freeRow !== -1) {
      return this.completeMove(col, freeRow);
    }
    this.events.emit('fullCol');
    this.checkFullBoard();
    return null;
  }

  checkFullBoard() {
    for (const col in this.state) {
      if (col.includes(0)) {
        return false;
      }
    }
    this.fullBoard = true;
    this.events.emit('fullBoard');
    return true;
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
