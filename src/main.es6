import Board from './pixi/Board.es6';
import Menu from './pixi/Menu.es6';
import TWEEN from 'tween.js';

class App {

  constructor() {
    this.playerTypes = {
      human: 'Human',
      ai1: 'Marvin',
      ai2: 'HAL',
    };

    this.settings = {
      players: [
        {
          name: 'Player 1',
          symbol: 1,
          type: 'human',
        },
        {
          name: 'Player 2',
          symbol: -1,
          type: 'ai1',
        },
      ],
    };
    this.stages = { Board, Menu };
    this.renderer = PIXI.autoDetectRenderer(600, 470);
    document.body.appendChild(this.renderer.view);
    this.changeStage('Menu');
    this.animate();
  }

  changeStage(stageName) {
    if (this.currentStage) {
      this.currentStage.stage.destroy();
    }
    this.currentStage = new this.stages[stageName](this.settings);
    this.currentStage.once('changestage', (newStageName) =>
      this.changeStage(newStageName)
    );
  }

  animate(time) {
    requestAnimationFrame((ms) => this.animate(ms));
    TWEEN.update(time);
    this.renderer.render(this.currentStage.stage);
  }
}

window.app = new App();
