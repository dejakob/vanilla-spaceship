/**
 * Main Level Object
 */
function Level() {
    this.isRunning = false;
    this.spaceship = new Spaceship;
}

// Default level number is 1
Level.prototype.levelNumber = 1;

Level.prototype.start = function() {
    this.isRunning = true;
    this.spaceship.resetPosition();
}

Level.prototype.pause = function() {
    this.isRunning = false;
}

Level.prototype.resume = function() {
    this.isRunning = true;
}

Level.prototype.stop = function() {
    this.isRunning = false;
}