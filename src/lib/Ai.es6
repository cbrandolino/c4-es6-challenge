import BoardModel from './BoardModel.es6';

class AI {

  constructor(player, board = null) {
    this.player = player;
    this.depth = 6;
    this._board = null;
    if (board) {
      this.board = board;
    }
  }

  play() {
    this.board.play(this.getMaxMoveScore);
  }

  getMaxMoveScore() {
    const scores = this.getScores();
    console.log('scores');
    return Object.keys(scores).reduce(
      (a, b) => scores[a] > scores[b] ? a : b
    );
  }

  getScores() {
    const values = {};
    for (const move of this.board.validColumns) {
      values[move] = this.getMoveScore(this.board, move, this.depth);
    }
    return values;
  }

  getMoveScore(board, move, depth) {
    const testBoard = this.cloneBoard(board);
    testBoard.play(move);
    if (testBoard.winner === this.player) {
      return 1 * (depth + 1);
    } else if (testBoard.winner && testBoard.winner !== this.player) {
      return -1 * (depth + 1);
    } else if (depth === 0 || testBoard.fullBoard) {
      return 0;
    }
    for (const nextMove of testBoard.validColumns) {
      return this.getMoveScore(testBoard, nextMove, depth - 1);
    }
  }

  cloneBoard(board) {
    return new BoardModel(board.state);
  }

  emptyScoresMap(board) {
    return new Map(board.validColumns.map((el) => [el, 0]));
  }

  get board() {
    return this._board;
  }

  set board(board) {
    this._board = board;
    return board;
  }
}

export default AI;
