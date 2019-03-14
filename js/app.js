// Win screen modal
let modal = document.querySelector(".modal");

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = -100;
    }
    this.checkCollision(this);
};

// Collision checker when player reaches game border
Enemy.prototype.checkCollision =  function(enemy){
    if (
        player.y + 131 >= enemy.y + 90 &&
        player.x + 25 <= enemy.x + 88 &&
        player.y + 73 <= enemy.y + 135 &&
        player.x + 76 >= enemy.x + 11) {
        player.x = 200;
        player.y = 400;
    };
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Constructor function
let Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Image render
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Key input and player image movement
Player.prototype.handleInput = function(keyPress){
    if (keyPress === 'left' && this.x > 33){
        this.x -= 101;
    }
    else if (keyPress === 'right' && this.x < 402){
        this.x += 101;
    }
    else if (keyPress === 'up' && this.y > 18){
        this.y -= 83;
    }
    else if (keyPress === 'down' && this.y < 383){
        this.y += 83;
    }
};

// Win modal when player reaches river image
Player.prototype.update = function() {
        if (this.y <= 71) {
                this.handleInput = function() {
                        this.x = 200;
                        this.y = 400;
                }
                setTimeout(function () {
                        this.x = 200;
                        this.y = 400;
                        modal.classList.add("show-modal");
                }, 500);
        }                      
};

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Creating player and allEnemies objects using a constructor
const player = new Player(200,400);
const allEnemies = [ new Enemy(5, 60, Math.random() * 450+300), new Enemy(0, 140, Math.random() * 465+150), new Enemy(-5, 220, Math.random() * 184 + 500)];

// Play again modal
const restartModal = document.querySelector("#restart-modal");
        restartModal.addEventListener("click", function() {
        window.location.reload();
});
