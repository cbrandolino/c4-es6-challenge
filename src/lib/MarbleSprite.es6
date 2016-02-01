import 'pixi.js';
import Sprite from './Sprite.es6';

class MarbleSprite extends Sprite {
  constructor(board, row, col, player) {
    super(board, 'marble', row, col);
    this.player = player;
    this.colorize();
    this.x = this.targetX;
    this.y = 0;
    this.zIndex = 1;
    this.board.addChildAt(this, 0);
    this.moving = 1;
    this.fallToPlace();
  }

  fallToPlace() {
    this.y ++;
    if (this.y >= this.targetY) {
      this.moving = 0;
      this.x = this.targetX;
      return;
    }
    requestAnimationFrame(() => this.fallToPlace());
  }

  colorize() {
    this.tint = (this.player === 1) ? 0xff0000 : 0x00ff00;
  }
}

export default MarbleSprite;
