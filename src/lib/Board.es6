class Board {
  constructor() {
    this.initializeEmptyBoard();
    this._currentPlayer = 1;
  }
  initializeEmptyBoard() {
    const cols = Array.from({length: 7}, 
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
    return (row !== undefined) ? this.swap(col, row) : { col, row, value: 0 };
  }

  swap(col, row, player = this.currentPlayer) {
    const oldState = this.state;
    oldState[col][row] = player;
    this.state = oldState;
    return { col, row, player };
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
