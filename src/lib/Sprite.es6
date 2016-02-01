import 'pixi.js';

class Sprite extends PIXI.Sprite {

  constructor(board, textureName) {
    const texture = PIXI.Texture.fromImage(require(`../../img/${textureName}.png`));
    super(texture);
    this.board = board;
    this.tileWidth = 60;
    this.boardHeight = this.tileWidth * 6;
    this._row = null;
    this._col = null;
    this._targetX = null;
    this._targetY = null;
    return this;
  }

  placeOnTarget() {
    this.x = this.targetX;
    this.y = this.targetY;
    this.board.addChildAt(this, this.order);
    return this;
  }

  get targetX() {
    return this._targetX;
  }

  get targetY() {
    return this._targetY;
  }

  get row() {
    return this._row;
  }

  set coords({ row, col }) {
    this.row = row;
    this.col = col;
  }

  set row(row) {
    this._row = row;
    this._targetY = this.boardHeight - this.tileWidth * row;
  }

  get col() {
    return this._col;
  }

  set col(col) {
    this._col = col;
    this._targetX = this.tileWidth * col;
  }

}

export default Sprite;
