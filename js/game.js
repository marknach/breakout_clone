function onLoad() {
  var leftKeyPress = false;
  var rightKeyPress = false;
  document.onkeydown = function(e) {
    if (e.keyIdentifier == "Left") {
      leftKeyPress = true;
    }
    else if (e.keyIdentifier == "Right") {
      rightKeyPress = true;
    }
  };

  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  var FPS = 60;
  var BLOCK_WIDTH = canvas.width / 10;
  var BLOCK_HEIGHT = 10;
  var BALL_RADIUS = 5;
  var NUM_ROWS = canvas.width / BLOCK_WIDTH;
  var ball = {
    x: (canvas.width - BALL_RADIUS) / 2,
    y: (canvas.height - BALL_RADIUS) / 2,
    dx: 1,
    dy: 2
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
    canvas.width = canvas.width;
    drawBlocks(canvas, ctx);
    drawPaddle(canvas, ctx);
    drawBall();
  }
  function drawBlocks() {
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < NUM_ROWS; x++) {
        ctx.fillRect(blocks[y][x]['x'], blocks[y][x]['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT);
      }
    }
  }

  function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.fillRect(paddle['x'], paddle['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT - 2);
  }

  function drawBall() {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ball.x += (ball.dx);
    ball.y += (ball.dy);
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
  }

  function movePaddle() {
    if (leftKeyPress && (paddle['x'] > 0)) {
      paddle['x'] -= 20;

    }
    if (rightKeyPress && (paddle['x'] < canvas.width - BLOCK_WIDTH)) {
      paddle['x'] += 20;

    }
    leftKeyPress = false;
    rightKeyPress = false;
  }

  function collisions() {
    // ball w/ wall
    if ( ball['x'] < BALL_RADIUS || ball['x'] > canvas.width - BALL_RADIUS ) {
      ball['dx'] *= -1;
    }

    if ( ball['y'] < BALL_RADIUS ) { ball['dy'] *= -1;}

    // ball w/ paddle
    if ((ball['y'] > canvas.height - BALL_RADIUS - BLOCK_HEIGHT) &&
      (ball['x']  > paddle['x'] - BALL_RADIUS && ball['x'] < paddle['x'] + BLOCK_WIDTH + BALL_RADIUS) ) {
      ball['dy'] *= -1;
    }
  }

  function gameloop() {
    movePaddle();
    draw();
    collisions();
  }

  init();
  window.setInterval(gameloop, 1000 / FPS);
}





