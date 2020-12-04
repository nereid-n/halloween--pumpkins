import Phaser from "phaser";
import GameOver from "./scenes/GameOver";
import MainScene from "./scenes/MainScene";

export const gameState = {
  score: 0,
  time: 0
};
export const width = window.innerWidth;
export const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: width,
  height: height,
  scene: [MainScene, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  }
};

const game = new Phaser.Game(config);
