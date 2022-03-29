"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var tileCount = 20;
var tileSize = canvas.width / tileCount - 2;
var headX = 10;
var headY = 10;
var xVelocity = 0;
var yVelocity = 0;
var appleX = 5;
var appleY = 5;
var snakeParts = [];
var tailLength = 0;
var then = 0;
var elapsed = 0;
document.body.addEventListener("keydown", keyDown);

var SnakePart = function SnakePart(x, y) {
  _classCallCheck(this, SnakePart);

  this.x = x;
  this.y = y;
};

function drawGame(timeStamp) {
  var delta = timeStamp - then;
  then = timeStamp;
  clearScreen();
  changeSnakePosition(delta);
  checkAppleCollision();
  drawApple();
  drawSnake(delta);
  requestAnimationFrame(drawGame);
}

function clearScreen() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake(delta) {
  elapsed += delta; // console.log(snakeParts);

  context.fillStyle = 'orange';
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  context.fillStyle = "green";

  for (var i = 0; i < snakeParts.length; i++) {
    var part = snakeParts[i];

    if (part.x === headX && part.y === headY) {
      console.log("game over");
      break;
    }
  }

  if (elapsed > 1000) {
    snakeParts.push(new SnakePart(headX, headY));
    elapsed = 0;
  }

  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
}

function drawApple() {
  context.fillStyle = "red";
  context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(delta) {
  headX = headX + 2 * xVelocity * delta * 0.001;
  headY = headY + 2 * yVelocity * delta * 0.001;
}

function checkAppleCollision() {
  console.log(headY, appleY);

  if (headX + 1 > appleX && headX < appleX + 1 && headY + 1 > appleY && headY < appleY + 1) {
    console.log("collision");
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }
}

function keyDown(event) {
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    xVelocity = 0;
    yVelocity = -1;
  }

  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    console.log(event.keyCode);
    xVelocity = 0;
    yVelocity = 1;
  }

  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }

  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}

requestAnimationFrame(drawGame);
//# sourceMappingURL=index.dev.js.map
