
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#FFF'
      this.cursors = this.game.input.keyboard.createCursorKeys();

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
      this.ball.body.velocity.y = -150;

      this.paddle = this.game.add.sprite(this.game.world.centerX, 500, 'block');
      this.paddle.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
      this.paddle.body.collideWorldBounds = true;
      this.paddle.body.bounce.set(1);
      this.paddle.body.immovable = true;


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
      if (this.cursors.left.isDown) {
        this.paddle.body.x -= 5;
      }
      else if (this.cursors.right.isDown) {
        this.paddle.body.x += 5;
      }
      this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
      this.game.physics.arcade.collide(this.ball, this.blocks, this.ballHitsBlock, null, this);
    },
    ballHitsBlock: function(_ball, _block) {
      console.log("HIT");
      _block.kill();
    },
    ballHitsPaddle: function(_ball, _paddle) {
      var diff = 0;

      if (_ball.x < _paddle.x)
      {
          //  Ball is on the left-hand side of the paddle
          diff = _paddle.x - _ball.x;
          _ball.body.velocity.x = (-10 * diff);
      }
      else if (_ball.x > _paddle.x)
      {
          //  Ball is on the right-hand side of the paddle
          diff = _ball.x -_paddle.x;
          _ball.body.velocity.x = (10 * diff);
      }
    }
  };
  
  module.exports = Play;
