/**
 * Spaceship object
 */
function Spaceship() {
    this.height = 100;
    this.width = 50;
    this.x = 0;
    this.y = 0;

    this.initOnDom = function() {
        this.spaceshipDom = document.createElement('div');
        document.body.appendChild(this.spaceshipDom);
    }

    this.draw = function() {
        this.spaceshipDom.style.position = 'absolute';
        this.spaceshipDom.style.backgroundColor = 'red';
        this.spaceshipDom.style.height = this.height + 'px';
        this.spaceshipDom.style.width = this.width + 'px';
        this.spaceshipDom.style.left = this.x + 'px';
        this.spaceshipDom.style.bottom = this.y + 'px';
    }

    this.initOnDom();
    this.draw();
}

Spaceship.STEP = 10;

Spaceship.prototype.moveLeft = function() {
    if (this.x >= Spaceship.STEP) {
        this.x -= Spaceship.STEP;
    }

    this.draw();
}

Spaceship.prototype.moveRight = function() {
    if (this.x <= WindowHelper.getWidth() - Spaceship.STEP) {
        this.x += Spaceship.STEP;
    }

    this.draw();
}

Spaceship.prototype.moveUp = function() {
    if (this.y <= Math.round(WindowHelper.getHeight() / 2)) {
        this.y += Spaceship.STEP;
    }

    this.draw();
}

Spaceship.prototype.moveDown = function() {
    if (this.y >= Spaceship.STEP) {
        this.y -= Spaceship.STEP;
    }

    this.draw();
}

Spaceship.prototype.resetPosition = function() {
    var windowHeight = WindowHelper.getHeight();
    var windowWidth = WindowHelper.getWidth();

    this.x = Math.round((windowWidth - this.width) / 2);
    this.y = Spaceship.STEP;
    this.draw();
}

Spaceship.prototype.destroy = function() {
    this.spaceshipDom.parentElement.removeChild(this.spaceshipDom);
}