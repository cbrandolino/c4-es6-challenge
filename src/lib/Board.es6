class Board {
  constructor() {
    this.initializeEmptyBoard();
  }
  initializeEmptyBoard() {
    this.state = new Array(6).fill(1);
  }
}

export default Board;
