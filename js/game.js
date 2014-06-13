function onLoad() {
  window.onkeyup = function(e) {
    if (e.keyIdentifier == "Left") {
      paddle['x'] -= 3;
    }
    else if (e.keyIdentifier == "Right") {
      paddle['x'] += 3;    }
  };

  var canvas = document.getElementById('game');
  var FPS = 60;
  var BLOCK_WIDTH = canvas.width / 10;
  var BLOCK_HEIGHT = 10;
  var BALL_RADIUS = 5;
  var NUM_ROWS = canvas.width / BLOCK_WIDTH;
  var ball = {
    x: (canvas.width - BALL_RADIUS) / 2,
    y: (canvas.height - BALL_RADIUS) / 2
  };
  var paddle = {
    x: (canvas.width - BLOCK_WIDTH) / 2,
    y: (canvas.height - BLOCK_HEIGHT)
  };
  var blocks = new Array(5);

  function init() {
    for (var y = 0; y < 5; y ++) {
      blocks[y] = new Array(NUM_ROWS);
      for (var x = 0; x < NUM_ROWS; x++) {
        blocks[y][x] = { x: x * BLOCK_WIDTH + 1, y: y * (BLOCK_HEIGHT + 2)};
      }
    }
  }

  function draw() {
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      drawBlocks(canvas, ctx);
      drawPaddle(canvas, ctx);
//      drawBall();
    }
  }
  function drawBlocks(canvas, ctx) {
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < NUM_ROWS; x++) {
        ctx.fillRect(blocks[y][x]['x'], blocks[y][x]['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT);
      }
    }
  }

  function drawPaddle(canvas, ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(paddle['x'], paddle['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT - 2);
  }

  init();
  draw();

}





