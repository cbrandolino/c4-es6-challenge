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
      const cell = new TileSprite('cell', this.board, row, col);
      cell.interactive = true;
      cell.on('click', () => {
        console.log('click')
        this.boardModel.play(cell.col)
      });
      cell.placeOnBoard();
    });
  }

  addMarbles() {
    this.boardModel.loop(({ row, col, value }) => {
      if (value === 0) {
        return;
      }
      const marble = new TileSprite('marble', this.board, row, col);
      marble.tint = (value === 1) ? 0xff0000 : 0x00ff00;
      marble.placeOnBoard();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.addMarbles();
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
