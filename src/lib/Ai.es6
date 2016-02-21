import BoardModel from './BoardModel.es6';

class AI {

  constructor(player) {
    this.player = player;
    this.depth = 6;
    this._board = null;
  }

  play() {
    this.moves = this.getPossibleScores(this.board, this.depth);
  }

  getPossibleScores(board, depth) {
    const possibleMoves = this.emptyScoresMap(tempBoard);
    for ([move, score] of possibleMoves) {

    }
  }

  getMoveScore(board, move, depth) {
    result = tempBoard.play(move);
    if (result.victory && board.winner == this.player) {
      return 1;
    }
    if (result.victory && board.winner != this.player) {
      return -1;
    }
    if (tempBoard.fullBoard) {
      return 0;
    }
    return this.getPossibleScores(board, depth - 1);
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
