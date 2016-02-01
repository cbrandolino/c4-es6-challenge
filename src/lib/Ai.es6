import BoardModel from './BoardModel.es6';

class AI {
  constructor() {
    this.lookahead = 4;
  }
  play(board) {
    this.board = board;
    this.moves = this.board.getMovesScore();
  }
  getMovesScore() {
    const scores = emptyScoresArray();
    return scores;
  }
  emptyScoresArray(board) {
    return new Map(board.validColumns.map((el) => [el, 0]));
  }
}

export default AI;
