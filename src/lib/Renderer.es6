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

  loopBoard(callback) {

    for (const [col, colRows] of this.board.state.entries()) {
      for (const row in colRows) {
        callback({ row, col });
      }
    }
  }

  addSpriteOnTile(sprite, baseName, row, col, unique = false) {
    sprite.name = `${baseName}-${row}-${col}`;
    sprite.x = this.tileWidth * col;
    sprite.y = this.tileWidth * row;
    if (unique) {
      this.removeSprite(sprite.name);
    }
    this.stage.addChild(sprite);
  }

  removeSprite(spriteName) {
    const sprite = this.stage.getChildByName(spriteName);
    if (sprite) {
      this.stage.removeChild(sprite);
    }
  }

  prepareMarbles() {
    this.loopBoard(({ row, col }) => {
      const cellValue = this.board.cellValue(row, col);
      if (cellValue === 0) {
        return;
      }
      const marble = new PIXI.Sprite(this.textures.marble);
      marble.tint = this.getMarbleTint(cellValue);
      this.addSpriteOnTile(marble, 'marble', row, col, true);
    });
  }

  getMarbleTint(value) {
    return (value === 1) ? 0xff0000 : 0x00ff00;
  }

  prepareBoard() {
    this.loopBoard(({ row, col }) => {
      const cell = new PIXI.Sprite(this.textures.cell);
      this.addSpriteOnTile(cell, 'cell', row, col);
    });
  }

  prepareStage() {
    this.pixiRenderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.pixiRenderer.view);
    this.stage = new PIXI.Container();
  }
}

export default Renderer;
