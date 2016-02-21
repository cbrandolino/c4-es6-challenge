import BoardModel from './BoardModel.es6';

class AI {

  constructor(player, board = null) {
    this.player = player;
    this.depth = 8;
    this._board = null;
    if (board) {
      this.board = board;
    }
  }

  play() {
    this.board.play(this.getMaxMoveScore());
  }

  getMaxMoveScore() {
    const scores = this.getScores();
    console.log(scores)
    return Object.keys(scores).reduce(
      (a, b) => scores[a] > scores[b] ? a : b
    );
  }

  getScores() {
    const values = {};
    for (let move of this.board.validColumns) {
      values[move] = this.getMoveScore(this.cloneBoard(this.board), [move], this.depth);
    }
    return values;
  }

  getMoveScore(board, possibleMoves, depth ) {
    if (!possibleMoves.length) {
      return 0;
    }
    board.play(possibleMoves.pop());
    if (board.winner === this.player) {
      return 1 * (depth + 1);
    } else if (board.winner && board.winner !== this.player) {
      return -1 * (depth + 1) +
        this.getMoveScore(this.cloneBoard(this.board), possibleMoves, depth);
    } else if (depth === 0 || board.fullBoard) {
      return 0;
    }
    let clone = this.cloneBoard(board);
    let score = 0;
    let futureMoves = possibleMoves.length ? possibleMoves : clone.validColumns;
    while (futureMoves.length) {
      score += this.getMoveScore(this.cloneBoard(board), futureMoves, depth -1);
    }
    return score;
  }

  cloneBoard(board) {
    return new BoardModel(board.state.map(a => a.slice()), board.currentPlayer);
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
