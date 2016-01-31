import Board from './lib/board.es6';
import Renderer from './lib/renderer.es6';

window.Renderer = Renderer;
class App {
  constructor() {
    this.board = new Board();
    this.renderer = new Renderer(this.board);
  }
}

window.app = new App();
