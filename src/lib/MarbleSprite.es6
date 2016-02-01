import 'pixi.js';
import Sprite from './Sprite.es6';

class MarbleSprite extends Sprite {
  constructor(board, row, col) {
    super(board, 'marble', row, col);
  }
}

export default MarbleSprite;
