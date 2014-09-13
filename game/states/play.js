
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


      this.ball = this.game.add.sprite(10, 10, 'ball');
      this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
      this.ball.body.collideWorldBounds = true;
      this.ball.body.bounce.set(1);
      this.ball.body.velocity.x = 50;
      this.ball.body.velocity.y = -80;

      for (var y = 0; y < 4; y++){
        for (var x = 0; x < 10; x++)
        {
            var brick = this.blocks.create(120 + (x * 54), 100 + (y * 52), 'block')
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
      }


    },
    update: function() {
      //this.game.physics.arcade.collide(this.ball, this.paddle, ballHitPaddle, null, this);
      this.game.physics.arcade.collide(this.ball, this.blocks, this.ballHitsBlock, null, this);

    },
    ballHitsBlock: function(_ball, _block) {
      console.log("HIT");
      _block.kill();
    }
  };
  
  module.exports = Play;
