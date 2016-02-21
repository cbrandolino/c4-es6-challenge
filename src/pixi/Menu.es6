import { EventEmitter } from 'events';

class Menu extends EventEmitter {
  constructor() {
    super();
    this.stage = new PIXI.Container();
    document.onclick = () => this.emit('changestage', 'Board');
  }
}

export default Menu;
