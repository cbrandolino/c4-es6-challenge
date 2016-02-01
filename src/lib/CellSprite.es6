import 'pixi.js';
import Sprite from './Sprite.es6';

class CellSprite extends Sprite {
  constructor(board, row, col) {
    super(board, 'cell');
    this.interactive = true;
    this.order = 0;
    this.col = col;
    this.row = row;
    this.placeOnTarget();
  }
}

export default CellSprite;
