import BoardModel from './BoardModel.es6';

class AI {

  constructor(player) {
    this.player = player;
    this.depth = 6;
    this._board = null;
  }

  play() {
    const testBoard = this.cloneBoard(board);
    const values = {};
    for (move of testBoard.validColumns) {
      values[move] = this.getScores(testBoard, move, depth);
    }
    return values;
  }

  getScores(board, move, depth) {
    board.play(move);
    if (board.winner === this.player) {
      return 1 * (depth + 1);
    } else if (board.winner && board.winner !== this.player) {
      return -1 * (depth + 1);
    } else if (depth === 0 || board.fullBoard) {
      return 0;
    }
    const testBoard = this.cloneBoard(board);
    for (let nextMove of testBoard.validColumns) {
      return this.getScores(testBoard, nextMove, depth - 1);
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
