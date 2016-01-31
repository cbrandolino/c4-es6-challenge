import 'pixi.js';

class Renderer {

  constructor(board) {
    this.board = board;
    this.tileWidth = 60;
    this.prepareStage();
    this.prepareTextures();
    this.prepareBoard();
    this.animate();
  }

  prepareTextures() {
    this.textures = {
      cell: PIXI.Texture.fromImage(require('../../img/cell.png')),
    };
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.pixiRenderer.render(this.stage);
  }

  prepareBoard() {
    for (const [colIndex, col] of this.board.entries()) {
      for (const [rowIndex, row] of col.entries()) {
        const cellTile = new PIXI.Sprite(this.textures.cell);
        cellTile.x = this.tileWidth * colIndex;
        cellTile.y = this.tileWidth * rowIndex;
        this.stage.addChild(cellTile);
      }
    }
  }

  prepareStage() {
    this.pixiRenderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.pixiRenderer.view);
    this.stage = new PIXI.Container();
  }
}

export default Renderer;
