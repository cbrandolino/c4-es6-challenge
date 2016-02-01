import 'pixi.js';
import Sprite from './Sprite.es6';

class CellSprite extends Sprite {
  constructor(board, row, col) {
    super(board, 'cell', row, col);
    this.interactive = true;
    this.on('click', () => this.makeMove(col));
    this.placeOnBoard();
  }
}

export default CellSprite;
