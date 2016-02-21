import BoardModel from './lib/BoardModel.es6';
import BoardCellSprite from './pixi/BoardCellSprite.es6';
import BoardMarbleSprite from './pixi/BoardMarbleSprite.es6';
import TWEEN from 'tween.js';

class App {

  constructor() {
    this.boardModel = new BoardModel();
    this.board = new PIXI.Stage();
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.bootNextPlayer();
    this.renderCells();
    this.animate();
  }

  moveComplete() {
    this.bootNextPlayer();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new BoardCellSprite(this.board, row, col);
      cell.on('click', (e) => this.makeMove(e.target.col));
      cell.on('mouseover', (e) => this.currentPlayerMarble.aim(e.target.col));
    });
  }

  bootNextPlayer() {
    const player = this.boardModel.currentPlayer;
    this.currentPlayerMarble = new BoardMarbleSprite(this.board, player);
    this.currentPlayerMarble.on('moveComplete', () => this.moveComplete());
  }

  makeMove(col) {
    if (this.currentPlayerMarble.moveInProgress) {
      return;
    }
    this.currentPlayerMarble.aim(col);
    const result = this.boardModel.play(col);
    if (result) {
      this.currentPlayerMarble.coords = result;
      this.currentPlayerMarble.fire();
    }
  }

  animate(time) {
    requestAnimationFrame((ms) => this.animate(ms));
    TWEEN.update(time);
    this.renderer.render(this.board);
  }
}

window.app = new App();
