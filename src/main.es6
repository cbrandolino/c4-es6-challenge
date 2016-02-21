import Board from './pixi/Board.es6';
import TWEEN from 'tween.js';

class App {

  constructor() {
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.currentStage = new Board();
    this.animate();
  }

  animate(time) {
    requestAnimationFrame((ms) => this.animate(ms));
    TWEEN.update(time);
    this.renderer.render(this.currentStage.stage);
  }
}

window.app = new App();
