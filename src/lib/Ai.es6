import BoardModel from './BoardModel.es6';

class AI {

  constructor() {
    this.lookahead = 6;
    this._board = null;
  }

  play() {
    this.moves = this.board.getMovesScore();
  }

  getMovesScore() {
    const scores = emptyScoresArray();
    return scores;
  }

  emptyScoresArray(board) {
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
