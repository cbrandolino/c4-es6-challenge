import 'pixi.js';
import Sprite from './Sprite.es6';

class MarbleSprite extends Sprite {
  constructor(board, row, col, player) {
    super(board, 'marble', row, col);
    this.player = player;
    this.colorize();
    this.placeOnBoard();
  }

  colorize() {
    this.tint = (this.player === 1) ? 0xff0000 : 0x00ff00;
  }
}

export default MarbleSprite;
