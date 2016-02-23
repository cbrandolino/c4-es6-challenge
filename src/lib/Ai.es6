import { EventEmitter } from 'events';
import BoardModel from './BoardModel.es6';
import AlphaBeta from 'alphabeta';

class AI extends EventEmitter {

  constructor(player) {
    super();
    this.player = player;
    this.depth = 8;
    this._board = null;
    // YAY finally a use for the full UTF-8 syntax support
    this.αβ = AlphaBeta(this.αβ);
    // Like srsly how cool is that? If u squint it looks like APL
  }

  getαβpγℓπ() {
    // Lol get it? AlphaBetaConfig. Gonna stop now tho.
  }

  generateMoves(state) {
    const nextPossibleStates = [];
 
    for (move in a list of possible moves ) { 
    // use item to create a new state 
    // push state onto nextPossibleStates 
  // } 
 
    return nextPossibleStates;
 
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
    return new Map(board.validColumns.map((el) => el));
  }

  get board() {
    return this._board;
  }

  set board(board) {
    this._board = this.cloneBoard(board);
  }
}

export default AI;
