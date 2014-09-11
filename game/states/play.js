
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#FFF'

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.checkCollision.down = false;

      this.blocks = this.game.add.group();
      this.blocks.enableBody = true;
      this.blocks.physicsBodyType = Phaser.Physics.ARCADE;


      this.ball = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ball');
    },
    update: function() {

    }
  };
  
  module.exports = Play;
