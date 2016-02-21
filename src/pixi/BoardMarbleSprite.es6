import 'pixi.js';
import BoardItemSprite from './BoardItemSprite.es6';
import TWEEN from 'tween.js';

class BoardMarbleSprite extends BoardItemSprite {
  constructor(board, player) {
    super(board, 'marble');
    this.player = player;
    this.colorize();
    this.order = 0;
    this.placeOnTarget();
    this.moveInProgress = false;
    this.aim(0);
    this.on('moveComplete', () => this.moveInProgress = false);
  }

  aim(col) {
    if (this.moveInProgress) {
      return;
    }
    this.col = col;
    this.placeOnTarget();
  }

  fire() {
    this.moveInProgress = true;
    new TWEEN.Tween({ y: 0 })
      .to({ y: this.targetY }, 1000)
      .easing(TWEEN.Easing.Exponential.In)
      .onUpdate(((marble) =>
        function ass() { marble.y = this.y; })(this))
      .onComplete(() => { 
        this.emit('moveComplete')
      })
      .start();
  }

  colorize() {
    this.tint = (this.player === 1) ? 0xff0000 : 0x00ff00;
  }
}

export default BoardMarbleSprite;
