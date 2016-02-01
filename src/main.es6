import BoardModel from './lib/BoardModel.es6';
import CellSprite from './lib/CellSprite.es6';
import MarbleSprite from './lib/MarbleSprite.es6';

class App {

  constructor() {
    this.boardModel = new BoardModel();
    this.board = new PIXI.Stage();
    this.renderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
    this.renderCells();
    this.animate();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new CellSprite(this.board, row, col);
      cell.on('click', (e) => this.makeMove(e.target.col));
    });
  }

  makeMove(col) {
    const result = this.boardModel.play(col);
    console.log(result)
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.board);
  }
}

window.app = new App();
