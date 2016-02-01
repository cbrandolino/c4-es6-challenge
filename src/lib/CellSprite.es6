import 'pixi.js';
import Sprite from './Sprite.es6';

class CellSprite extends Sprite {
  constructor(board, row, col) {
    super(board, 'cell', row, col);
    this.interactive = true;
    this.zIndex = 2;
    this.placeOnBoard();
  }
}

export default CellSprite;
