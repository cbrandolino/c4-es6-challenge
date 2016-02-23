import { EventEmitter } from 'events';

class Menu extends EventEmitter {
  constructor() {
    super();
    this.stage = new PIXI.Container();
    this.makeButtons();
  }

  makeButtons() {
    this.makeButton('Play', () => this.emit('changestage', 'Board'));
  }

  makeButton(text, click, selected) {
    const button = new PIXI.Text(text,
      { font: '24px Arial', fill: 0xff1010, align: 'center' }
    );
    button.interactive = true;
    button.on('click', click);
    this.stage.addChild(button);
  }
}

export default Menu;
