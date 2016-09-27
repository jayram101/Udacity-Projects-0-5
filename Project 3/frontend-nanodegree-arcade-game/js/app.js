// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //Detect collision
  if (this.x + 50 >= player.x && this.x < player.x + 50 && //less than player width
    this.y + 50 >= player.y && this.y < player.y + 83) {
    player.base();
  }
  //Reposition the enemy when falling off at end back to the begining of the canvas left
  if (this.x <= 450) {
    this.x = this.x + 50 * dt; //have slowed down the enemy from 100
  } else {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Same methods for Gem
var Gem = function(x, y, url) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = url;
};

Gem.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Gem.prototype.capture = function () {
if (this.x + 50 >= player.x &&
   this.x < player.x + 50 &&
   this.y + 50 >= player.y &&
   this.y < player.y + 50) {
  player.update(); //to collect points to be added
}
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, points) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.points = points;
  this.finish = "";

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  if(this.finish === " Start over(reload)!"){this.points = 0; this.finish = "";}
  else {this.points = this.points + 1;}
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {

  if (move === 'left') {
    if (this.x - 101 >= 0) {
      this.x -= 101; //  x = x - width
    } else this.base();
  }

  if (move === 'up') {
    if (this.y - 83 >= 0) {
      this.y -= 83;  //y = y - height
    } else {this.y=0; this.finish = " Start over(reload)!"; this.base();}
  }

  if (move === 'right') {
    if (this.x + 101 <= 505) {
      this.x += 101; //x = x + width
    } else this.base();
  }

  if (move === 'down') {
    if (this.y + 83 <= 415) {
      this.y += 83; //x = x - height
    } else this.base();
  }
  gems.forEach(function(gem) {
      gem.capture();
    });
};

Player.prototype.base = function() {
//possibly shift to the update?
  this.x = 202;
  this.y = 399;
};

// Now instantiating objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Each png square is 101*83
var x = 101;
var y = 83;
var points = 0;
var gems = [];
var allEnemies = [];
//Initializing objects.
var player = new Player(2 * x, 5 * y, points);
gems.push(new Gem(x+10, y, 'images/Gem-Orange.png'), new Gem(3 * x+10, 3 * y, 'images/Gem-Green.png'));
allEnemies.push(new Enemy(x, 0.9 * y), new Enemy(2 * x, 1.8 * y), new Enemy(3 * x, 2.7 * y));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// function is called on keyup and passed the e
// Note 'player' is an instance of the prototype "Player"
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});


