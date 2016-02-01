import BoardModel from './lib/BoardModel.es6';
import Renderer from './lib/Renderer.es6';

window.Renderer = Renderer;
class App {
  constructor() {
    this.boardModel = new BoardModel();
    this.renderer = new Renderer(this.boardModel);
    document.body.appendChild(this.renderer.view);
  }
}
window.app = new App();
