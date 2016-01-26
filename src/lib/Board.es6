class Board {
  constructor() {
    this.initializeEmptyBoard();
    this._currentPlayer = 1;
  }
  initializeEmptyBoard() {
    this.state = new Array(7).fill(new Array(6).fill(0));
  }
  changePlayer() {
    this._currentPlayer = this.nextPlayer;
    return this._currentPlayer;
  }
  get currentPlayer() {
    return this._currentPlayer;
  }
  get nextPlayer() {
    return -this._currentPlayer;
  }
}

export default Board;
