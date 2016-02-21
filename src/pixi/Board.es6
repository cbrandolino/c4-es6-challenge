import BoardModel from '../lib/BoardModel.es6';
import BoardCellSprite from './BoardCellSprite.es6';
import BoardMarbleSprite from './BoardMarbleSprite.es6';
import { EventEmitter } from 'events';

class Board extends EventEmitter {

  constructor() {
    super();
    this.boardModel = new BoardModel();
    this.stage = new PIXI.Container();
    this.bootNextPlayer();
    this.renderCells();
  }

  moveComplete() {
    this.bootNextPlayer();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new BoardCellSprite(this.stage, row, col);
      cell.on('click', (e) => this.makeMove(e.target.col));
      cell.on('mouseover', (e) => this.currentPlayerMarble.aim(e.target.col));
    });
  }

  bootNextPlayer() {
    const player = this.boardModel.currentPlayer;
    this.currentPlayerMarble = new BoardMarbleSprite(this.stage, player);
    this.currentPlayerMarble.on('moveComplete', () => this.moveComplete());
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
}

export default Board;
