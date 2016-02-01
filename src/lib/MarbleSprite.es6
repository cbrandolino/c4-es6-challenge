import 'pixi.js';
import Sprite from './Sprite.es6';
import TWEEN from 'tween.js';

class MarbleSprite extends Sprite {
  constructor(board, row, col, player) {
    super(board, 'marble', row, col);
    this.player = player;
    this.colorize();
    this.x = this.targetX;
    this.y = 0;
    this.zIndex = 1;
    this.board.addChildAt(this, 0);
    this.tween(this);
  }

  tween(marble) {
    this.moving = 1;
    new TWEEN.Tween({y: 0})
      .to({ y: this.targetY }, 1000)
      .onUpdate(function () { marble.y = this.y; })
      .onComplete(() => this.moving = 0)
      .start();
  }
      

  colorize() {
    this.tint = (this.player === 1) ? 0xff0000 : 0x00ff00;
  }
}

export default MarbleSprite;
