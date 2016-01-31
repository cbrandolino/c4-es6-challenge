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
      marble: PIXI.Texture.fromImage(require('../../img/marble.png')),
    };
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.prepareMarbles();
    this.pixiRenderer.render(this.stage);
  }

  prepareMarbles() {
    for (const [colIndex, col] of this.board.state.entries()) {
      for (const [rowIndex, row] of col.entries()) {
        const cellValue = this.board.cellValue(rowIndex, colIndex);
        if (cellValue === 0) {
          continue;
        }
        const marbleName = `marble-${rowIndex}-${colIndex}`;
        const oldMarble = this.stage.getChildByName(marbleName);
        if (oldMarble) {
          this.stage.removeChild(oldMarble);
        }
        const marble = new PIXI.Sprite(this.textures.marble);
        marble.name = marbleName;
        marble.tint = this.getMarbleTint(cellValue);
        marble.x = this.tileWidth * colIndex;
        marble.y = this.tileWidth * rowIndex;
        this.stage.addChild(marble);
      }
    }
  }

  getMarbleTint(value) {
    return (value === 1) ? 0xff0000 : 0x00ff00;
  }

  prepareBoard() {
    for (const [colIndex, col] of this.board.state.entries()) {
      for (const [rowIndex, row] of col.entries()) {
        const cellTile = new PIXI.Sprite(this.textures.cell);
        cellTile.x = this.tileWidth * colIndex;
        cellTile.y = this.tileWidth * rowIndex;
        cellTile.name = `${rowIndex}-${colIndex}`;
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
