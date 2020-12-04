import {width, height, gameState} from "../index";

export default class GameOver extends Phaser.Scene{
  constructor() {
    super('gameOver');
  }
  create() {
    this.add.text(width / 2 - 85, height / 2 - 20, 'Game Over', { fontSize: '34px', fill: '#ffffff' });
    this.add.text(width / 2 - 145, height / 2 + 20, 'Click to Restart', { fontSize: '34px', fill: '#ffffff' });
    this.input.on('pointerup', () => {
      gameState.score = 0;
      gameState.time = 0;
      this.scene.launch('mainScene');
      this.scene.restart('mainScene');
      this.scene.sleep();
    });
  }
}
