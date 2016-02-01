import 'pixi.js';
import Sprite from './Sprite.es6';
import TWEEN from 'tween.js';

class MarbleSprite extends Sprite {
  constructor(board, player) {
    super(board, 'marble');
    this.player = player;
    this.colorize();
    this.order = 0;
    this.placeOnTarget()
  }

  aim(col) {
    if (this.moving) {
      return;
    }
    this.col = col;
    this.placeOnTarget();
  }

  startMoving() {
    this.moving = 1;
    new TWEEN.Tween({y: 0})
      .to({ y: this.targetY }, 1000)
      .onUpdate(((marble) => 
        function() { marble.y = this.y; })(this))
      .onComplete(() => this.movingComplete())
      .start();
  }

  movingComplete() {
    this.moving = 0;
  }
  
  colorize() {
    this.tint = (this.player === 1) ? 0xff0000 : 0x00ff00;
  }
}

export default MarbleSprite;
