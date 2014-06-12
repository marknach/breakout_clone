function drawBoard() {
  var canvas = document.getElementById('game');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    drawBlocks(canvas, ctx);
    drawPaddle(canvas, ctx);
  }
}
function drawBlocks(canvas, ctx) {
  var blockWidth = (canvas.width / 10.0);
  var rowHeight = 10;
  var numRows = 5;
  for (var y = 0; y < numRows; y ++) {
    for (var x = 0; x < canvas.width; x += blockWidth) {
      ctx.fillStyle = "black";
      ctx.fillRect(x + 1, y * (rowHeight+2), blockWidth - 2, rowHeight);
    }
  }
}

function drawPaddle(canvas, ctx) {
  ctx.fillStyle = "black";
  var blockWidth = (canvas.width / 10.0);
  var rowHeight = 10;
  var x = (canvas.width - blockWidth) / 2;
  var y = (canvas.height - rowHeight);
  ctx.fillRect(x, y, blockWidth - 2, rowHeight - 2);
}

function movePaddle(n) {
  console.log(n);
}

window.onkeyup = function(e) {
  if (e.keyIdentifier == "Left") {
    movePaddle(-1);
  }
  else if (e.keyIdentifier == "Right") {
    movePaddle(1);
  }
};