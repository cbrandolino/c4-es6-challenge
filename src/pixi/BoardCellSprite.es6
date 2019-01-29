import 'pixi.js';
import BoardItemSprite from './BoardItemSprite.es6';

class BoardCellSprite extends BoardItemSprite {
  constructor(board, row, col) {
    super(board, 'cell');
    this.interactive = true;
    this.order = 0;
    this.col = col;
    this.row = row;
    this.placeOnTarget();
  }
}

export default BoardCellSprite;
