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
  var NUM_ROWS = 5;
  var NUM_COLUMNS = canvas.width / BLOCK_WIDTH;
  var BLOCK_COUNT = NUM_ROWS * NUM_COLUMNS;
  var COLORS = ["#0E3D59", "#88A61B", "#F29F05", "#F25C05", "#D92525"];
  var ballColor = "black";
  var ball = {
    x: (canvas.width - BALL_RADIUS) / 2,
    y: (canvas.height - BALL_RADIUS) / 2,
    dx: 1,
    dy: 3
  };
  var paddle = {
    x: (canvas.width - BLOCK_WIDTH) / 2,
    y: (canvas.height - BLOCK_HEIGHT)
  };
  var blocks = new Array(5);

  function init() {
    for (var y = 0; y < NUM_ROWS; y ++) {
      blocks[y] = new Array(NUM_COLUMNS);
      for (var x = 0; x < NUM_COLUMNS; x++) {
        blocks[y][x] = { x: x * BLOCK_WIDTH + 1, y: y * (BLOCK_HEIGHT + 2), hit: false};
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
    for (var y = 0; y < NUM_ROWS; y++) {
      for (var x = 0; x < NUM_COLUMNS; x++) {
        if ( !blocks[y][x]['hit']) {
          ctx.fillStyle = COLORS[y];
          ctx.fillRect(blocks[y][x]['x'], blocks[y][x]['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT);
        }
      }
    }
  }

  function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.fillRect(paddle['x'], paddle['y'], BLOCK_WIDTH - 2, BLOCK_HEIGHT - 2);
  }

  function drawBall() {
    ctx.strokeStyle = "black";
    ctx.fillStyle = ballColor;
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
    if ( ball['x'] < BALL_RADIUS || ball['x'] > canvas.width - BALL_RADIUS ) { ball['dx'] *= -1; }
    if ( ball['y'] < BALL_RADIUS )                                           { ball['dy'] *= -1;}

    // ball w/ paddle
    if ((ball['y'] > canvas.height - BALL_RADIUS - BLOCK_HEIGHT) &&
      (ball['x']  > paddle['x'] - BALL_RADIUS && ball['x'] < paddle['x'] + BLOCK_WIDTH + BALL_RADIUS) ) {
      ball['dy'] *= -1;
      ball['dx'] -= (paddle['x'] + (BLOCK_WIDTH / 2) - ball['x']) / (BLOCK_WIDTH / 2);
    }
    for (var y = 0; y < NUM_ROWS; y++) {
      for (var x = 0; x < NUM_COLUMNS; x++) {
        if ( !blocks[y][x]['hit'] ) {
          if ( collideFromTop(blocks[y][x]) || collideFromBottom(blocks[y][x]) ) {
            blocks[y][x]['hit'] = true;
            BLOCK_COUNT--;
            console.log(BLOCK_COUNT + " blocks left");
            ball['dy'] *= -1;
            ballColor = COLORS[y];
            break;
          }
          if ( collideFromLeft(blocks[y][x]) || collideFromRight(blocks[y][x]) ) {
            blocks[y][x]['hit'] = true;
            BLOCK_COUNT--;
            console.log(BLOCK_COUNT + " blocks left");
            ball['dx'] *= -1;
            break;
          }
        }
      }
    }
  }

  function collideFromLeft(block) {
    return ball['y']  > block['y'] && ball['y'] < block['y'] + BLOCK_HEIGHT
      && Math.abs((ball['x'] + BALL_RADIUS) - block['x']) < ball['dx'];
  }

  function collideFromRight(block) {
    return ball['y']  > block['y'] && ball['y'] < block['y'] + BLOCK_HEIGHT
      && Math.abs((ball['x'] + BALL_RADIUS) - (block['x'] + BLOCK_WIDTH)) < ball['dx'];
  }

  function collideFromTop(block) {
    return ball['x']  > block['x'] && ball['x'] < block['x'] + BLOCK_WIDTH
      && (ball['y'] + BALL_RADIUS) - block['y'] < ball['dy'];
  }

  function collideFromBottom(block) {
    return ball['x']  > block['x'] && ball['x'] < block['x'] + BLOCK_WIDTH
      && (ball['y'] - BALL_RADIUS) -  (block['y'] + BLOCK_HEIGHT) < ball['dy'];
  }

  function gameOver() {
    if (ball['y'] > canvas.height - BLOCK_HEIGHT ) {
      console.log("GG NUB");
      window.clearInterval(game);
    }
    if (BLOCK_COUNT == 0){
      console.log("way 2 go chief");
      window.clearInterval(game);
    }
  }

  function gameloop() {
    movePaddle();
    draw();
    collisions();
    gameOver();
  }

  init();
  var game = window.setInterval(gameloop, 1000 / FPS);
}
