import Board from './pixi/Board.es6';
import Menu from './pixi/Menu.es6';
import TWEEN from 'tween.js';

class App {

  constructor() {
    this.stages = { Board, Menu };
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.changeStage('Menu');
    this.animate();
  }


  changeStage(stageName) {
    this.currentStage = new this.stages[stageName]();
    this.currentStage.once('changestage', (stageName) =>
      this.changeStage(stageName)

    );
  }

  animate(time) {
    requestAnimationFrame((ms) => this.animate(ms));
    TWEEN.update(time);
    this.renderer.render(this.currentStage.stage);
  }
}

window.app = new App();
