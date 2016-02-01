import 'pixi.js';
import TileSprite from './TileSprite.es6';

class Renderer {

  constructor(boardModel) {
    this.boardModel = boardModel;
    this.board = new PIXI.Stage();
    this.pixiRenderer = PIXI.autoDetectRenderer(800, 600);
    this.view = this.pixiRenderer.view;
    this.renderCells();
    this.animate();
  }

  renderCells() {
    this.boardModel.loop(({ row, col }) => {
      const cell = new TileSprite(this.board, 'cell', row, col);
      cell.interactive = true;
      cell.on('click', () => {
        this.boardModel.play(cell.col);
      });
      cell.placeOnBoard();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.pixiRenderer.render(this.board);
  }

  removeSprite(spriteName) {
    const sprite = this.board.getChildByName(spriteName);
    if (sprite) {
      this.board.removeChild(sprite);
    }
  }
}

export default Renderer;
