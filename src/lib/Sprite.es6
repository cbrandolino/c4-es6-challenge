import 'pixi.js';

class Sprite extends PIXI.Sprite {

  constructor(board, textureName, row, col) {
    const texture = PIXI.Texture.fromImage(require(`../../img/${textureName}.png`));
    super(texture);
    this.board = board;
    this.row = row;
    this.col = col;
    this.tileWidth = 60;
    this.boardHeight = this.tileWidth * 6;
    this.targetX = this.tileWidth * this.col;
    this.targetY = this.boardHeight - this.tileWidth * this.row;
    this.name = `${textureName}-${row}-${col}`;
    return this;
  }

  placeOnBoard() {
    this.x = this.targetX;
    this.y = this.targetY;
    this.board.addChild(this);
    return this;
  }
}

export default Sprite;
