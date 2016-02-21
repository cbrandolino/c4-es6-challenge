import BoardModel from './BoardModel.es6';

class AI {

  constructor(player) {
    this.player = player;
    this.depth = 6;
    this._board = null;
  }

  play() {
    //this.moves = this.getPossibleScores(this.board, this.depth);
  }

  getScores(board) {
    return this.getMovesScores(this.cloneBoard(board));
  }

  cloneBoard(board) {
    return new BoardModel(board.state);
  }

  getMovesScores(board) {
    const scores = {};
    for (const move of board.validColumns) {
      scores[move] = this.getMoveScore(board, move);
    }
    return scores;
  }

  getMoveScore(board, move) {
    const result = board.play(move);
    if (result.victory && board.winner === this.player) {
      return 1;
    }
    if (result.victory && board.winner !== this.player) {
      return -1;
    }
    if (board.fullBoard) {
      return 0;
    }
    return 0;
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
