import BoardModel from '../lib/BoardModel.es6';
import BoardCellSprite from './BoardCellSprite.es6';
import BoardMarbleSprite from './BoardMarbleSprite.es6';
import Ai from '../lib/Ai.es6';
import { EventEmitter } from 'events';

class Board extends EventEmitter {

  constructor(settings) {
    super();
    this.settings = settings;
    this.boardModel = new BoardModel();
    this.stage = new PIXI.Container();
    this.setUpAis();
    this.bootNextPlayer();
    this.renderCells();
  }

  moveComplete() {
    this.bootNextPlayer();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new BoardCellSprite(this.stage, row, col);
      cell.on('click', e => this.makeMove(e.target.col));
      cell.on('mouseover', e => this.currentPlayerMarble.aim(e.target.col));
    });
  }

  bootNextPlayer() {
    const player = this.boardModel.currentPlayer;
    this.currentPlayerMarble = new BoardMarbleSprite(this.stage, player);
    this.currentPlayerMarble.once('moveComplete', () => this.moveComplete());
    if (this.ais[player]) {
      this.ais[player].board = this.boardModel;
      this.ais[player].on('maxScoreReady', maxScore => {
        this.makeMove(parseInt(maxScore));
      });
      this.ais[player].getMaxMoveScore();
    }
  }

  makeMove(col) {
    if (this.currentPlayerMarble.moveInProgress) {
      return;
    }
    this.currentPlayerMarble.aim(col);
    const result = this.boardModel.play(col);
    if (result) {
      this.currentPlayerMarble.coords = result;
      this.currentPlayerMarble.fire();
    }
  }

  setUpAis() {
    this.ais = {};
    for (const player of this.settings.players) {
      if (player.type !== 'human') {
        this.ais[player.symbol] = new Ai(player.symbol);
      }
    }
  }
}

export default Board;
