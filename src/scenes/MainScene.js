import bg from "../assets/img/bg/2_game_background.png";
import player from "../assets/img/characters/sad.png";
import witch from "../assets/img/characters/broom.png";
import platform from "../assets/img/bg/platform-2.png";
import pumpkin from "../assets/img/elements/halloween.png";
import candy from "../assets/img/elements/candy.png";
import {width, height, gameState} from "../index";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('mainScene');
  }
  preload() {
    this.load.image('bg', bg);
    this.load.image('player', player);
    this.load.image('witch', witch);
    this.load.image('platform', platform);
    this.load.image('pumpkin', pumpkin);
    this.load.image('candy', candy);
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.bgSettings();
    this.textSettings();
    this.playerSettings();
    this.witchSettings();
    this.platformSettings();
    this.pumpkinsSettings();
    this.candiesSettings();
    this.timer();
  }
  update(time, delta) {
    this.playerMove();
  }

  bgSettings() {
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.bg.setDisplaySize(width, height);
  }
  textSettings() {
    this.scoreText = this.add.text(width - 50, 10, gameState.score, { fontSize: '22px', fill: '#ffffff' });
    this.timeText = this.add.text(10, 10, gameState.time, { fontSize: '22px', fill: '#ffffff' });
    this.scoreText.depth = 1;
    this.timeText.depth = 1;
  }
  platformSettings() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(width / 2, height, 'platform').setScale(1.5, 1.3).refreshBody();
    this.physics.add.collider(this.player, this.platforms);
  }
  playerSettings() {
    this.player = this.physics.add.sprite(width / 2, height - 150, 'player').setScale(0.2, 0.2);
    this.player.setCollideWorldBounds(true);
  }
  witchSettings() {
    this.witch = this.add.sprite(70, 70, 'witch').setScale(0.25, 0.25);
    this.witch.move = this.tweens.add({
      targets: this.witch,
      x: width - 70,
      ease: 'Linear',
      duration: 4000,
      repeat: -1,
      yoyo: true,
      onYoyo: () => {
        this.witch.flipX = true;
      },
      onRepeat: () => {
        this.witch.flipX = false;
      }
    });
  }
  pumpkinsSettings() {
    this.pumpkins = this.physics.add.group();
    this.time.addEvent({
      delay: 300,
      callback: () => {
        const xCoord = Math.random() * width;
        this.pumpkins.create(xCoord, 10, 'pumpkin').setScale(0.15, 0.15);
      },
      callbackScope: this,
      loop: true,
    });
    this.physics.add.collider(this.pumpkins, this.platforms, function (pumpkin) {
      pumpkin.destroy();
    });
    this.physics.add.collider(this.player, this.pumpkins, () => {
      this.scene.pause();
      this.scene.launch('gameOver');
    });
  }
  candiesSettings() {
    this.candies = this.physics.add.group();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const xCoord = this.witch.x;
        this.candies.create(xCoord, 170, 'candy').setScale(0.15, 0.15);
      },
      callbackScope: this,
      loop: true
    });
    this.physics.add.collider(this.candies, this.platforms, function (candy) {
      candy.destroy();
    });
    this.physics.add.collider(this.player, this.candies, (player, candy) => {
      candy.destroy();
      gameState.score++;
      this.scoreText.setText(gameState.score);
    });
  }
  timer() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        gameState.time++;
        let time = '';
        let minutes = parseInt(gameState.time / 60);
        let seconds = gameState.time - minutes * 60;
        if (gameState.time < 60) {
          time = gameState.time;
        }
        else if (gameState.time >= 60) {
          time = `${minutes}:${seconds}`
        }
        this.timeText.setText(time);
      },
      callbackScope: this,
      loop: true
    });
  }

  playerMove() {
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(600);
      this.player.flipX = true;
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-600);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }
  }
}
