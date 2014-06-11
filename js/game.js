function drawBoard() {
  var canvas = document.getElementById('game');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
  var blockWidth = (canvas.width / 10.0) - 2.0;
  for (var x = 0; x < canvas.width; x += blockWidth) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(x + 1, 0, blockWidth, 5);
  }
}