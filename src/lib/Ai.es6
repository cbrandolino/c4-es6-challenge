import { EventEmitter } from 'events';
import BoardModel from './BoardModel.es6';

class AI extends EventEmitter {

  constructor(player) {
    super();
    this.player = player;
    this.depth = 8;
    this._board = null;
  }

  getMaxMoveScore() {
    const scores = this.getScores();
    const maxScore = Object.keys(scores).reduce(
      (a, b) => scores[a] > scores[b] ? a : b
    );
    this.emit('maxScoreReady', maxScore);
    return maxScore;
  }

  cloneBoard(board) {
    const state = board.state.map(a => a.slice());
    const player = board.currentPlayer;
    return new BoardModel(state, player);
  }

  emptyScoresMap(board) {
    return new Map(board.validColumns.map((el) => [el, 0]));
  }

  get board() {
    return this._board;
  }

  set board(board) {
    this._board = this.cloneBoard(board);
  }
}

export default AI;
