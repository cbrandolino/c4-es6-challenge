import 'pixi.js';

class Renderer {

  constructor(board) {
    this.board = board;
    this.tileWidth = 60;
    this.initialisePixi();
    this.initialiseBoard();
    this.animate();
  }

  initialisePixi() {
    this.pixiRenderer = PIXI.autoDetectRenderer(800, 600);
    document.body.appendChild(this.pixiRenderer.view);
    this.stage = new PIXI.Container();
    this.textures = {
      cell: PIXI.Texture.fromImage(require('../../img/cell.png')),
      marble: PIXI.Texture.fromImage(require('../../img/marble.png')),
    };
  }

  initialiseBoard() {
    this.loopBoard(({ row, col }) => {
      this.addSpriteOnTile('cell', row, col);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.addMarbles();
    this.pixiRenderer.render(this.stage);
  }

  loopBoard(callback) {
    for (const [col, colRows] of this.board.state.entries()) {
      for (const row in colRows) {
        callback({ row, col });
      }
    }
  }

  addSpriteOnTile(spriteId, row, col, unique = false) {
    const sprite = new PIXI.Sprite(this.textures[spriteId]);
    sprite.name = `${spriteId}-${row}-${col}`;
    sprite.x = this.tileWidth * col;
    sprite.y = this.tileWidth * row;
    if (unique) {
      this.removeSprite(sprite.name);
    }
    this.stage.addChild(sprite);
    return sprite;
  }

  removeSprite(spriteName) {
    const sprite = this.stage.getChildByName(spriteName);
    if (sprite) {
      this.stage.removeChild(sprite);
    }
  }

  addMarbles() {
    this.loopBoard(({ row, col }) => {
      const cellValue = this.board.cellValue(row, col);
      if (cellValue === 0) {
        return;
      }
      const marble = this.addSpriteOnTile( 'marble', row, col, true);
      marble.tint = (cellValue === 1) ? 0xff0000 : 0x00ff00;
    });
  }
}

export default Renderer;
