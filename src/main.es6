import BoardModel from './lib/BoardModel.es6';
import CellSprite from './lib/CellSprite.es6';
import MarbleSprite from './lib/MarbleSprite.es6';
import TWEEN from 'tween.js';
import { EventEmitter } from 'events';

class App {

  constructor() {
    this.boardModel = new BoardModel();
    this.board = new PIXI.Stage();
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.renderCells();
    this.bootCurrentPlayer();
    this.animate();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new CellSprite(this.board, row, col);
      cell.on('click', (e) => this.makeMove(e.target.col));
      cell.on('mouseover', (e) => this.currentPlayerMarble.aim(e.target.col));
    });
  }

  bootCurrentPlayer() {
    const player = this.boardModel.currentPlayer;
    this.currentPlayerMarble = new MarbleSprite(this.board, player);
  }

  makeMove(col) {
    if (this.currentPlayerMarble.moving) {
      return;
    }
    const result = this.boardModel.play(col);
    if (result) {
      this.currentPlayerMarble.coords = result;
      this.currentPlayerMarble.startMoving();
      this.bootCurrentPlayer();
    }
  }

  animate(time) {
    requestAnimationFrame((ms) => this.animate(ms));
    TWEEN.update(time);
    this.renderer.render(this.board);
  }
}

window.app = new App();
