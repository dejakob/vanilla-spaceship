/**
 * Spaceship object
 */
function Spaceship() {
    this.height = 100;
    this.width = 50;
    this.x = 0;
    this.y = 0;

    // Append DOM element
    var spaceshipDom = document.createElement('div');
    spaceshipDom.style.position = 'absolute';
    spaceshipDom.style.height = this.height + 'px';
    spaceshipDom.style.width = this.width + 'px';
    spaceshipDom.style.left = this.x + 'px';
    spaceshipDom.style.bottom = this.y + 'px';
    document.body.appendChild('spaceshipDom');
}

Spaceship.STEP = 10;

Spaceship.prototype.moveLeft = function() {
    if (this.x >= Spaceship.STEP) {
        this.x -= Spaceship.STEP;
    }
}

Spaceship.prototype.moveRight = function() {
    if (this.x <= WindowHelper.getWidth() - Spaceship.STEP) {
        this.x += Spaceship.STEP;
    }
}

Spaceship.prototype.moveUp = function() {
    if (this.y <= Math.round(WindowHelper.getHeight() / 2)) {
        this.y += Spaceship.STEP;
    }
}

Spaceship.prototype.moveDown = function() {
    if (this.y >= Spaceship.STEP) {
        this.y -= Spaceship.STEP;
    }
}

Spaceship.prototype.resetPosition = function() {
    var windowHeight = WindowHelper.getHeight();
    var windowWidth = WindowHelper.getWidth();

    this.x = Math.round((windowWidth - this.width) / 2);
    this.y = Math.round((windowHeight - this.height) / 2);
}