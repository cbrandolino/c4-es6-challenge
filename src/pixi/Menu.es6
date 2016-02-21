import { EventEmitter } from 'events';

class Menu extends EventEmitter {
  constructor() {
    super();
    this.stage = new PIXI.Container();
    this.makeButtons();
  }

  makeButtons() {
    const buttons = [
      ['Play', 'play'],
    ];
    buttons.forEach((buttonData) => this.makeButton(buttonData));
  }

  makeButton([text, handle]) {
    const button = new PIXI.Text(text,
      { font: '24px Arial', fill: 0xff1010, align: 'center' }
    );
    button.interactive = true;
    button.on('click', () => this.buttonClicked(handle));
    this.stage.addChild(button);
  }

  buttonClicked(handle) {
    if (handle === 'play') {
      this.emit('changestage', 'Board');
    }
  }
}

export default Menu;
