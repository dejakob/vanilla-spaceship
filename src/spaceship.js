/**
 * Spaceship object
 */
function Spaceship() {
    this.height = 100;
    this.width = 50;
    this.x = 0;
    this.y = 0;
    this.bullets = [];

    /**
     * Initialize the spaceShip DOM element
     */
    this.initOnDom = function() {
        this.spaceshipDom = document.createElement('div');
        document.body.appendChild(this.spaceshipDom);
    }

    /**
     * Attach updated styling to the DOM element
     */
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

// Spaceship constants
Spaceship.STEP = 10;

/**
 * Move the spaceShip one step to left
 */
Spaceship.prototype.moveLeft = function() {
    if (this.x >= Spaceship.STEP) {
        this.x -= Spaceship.STEP;
    }

    this.draw();
}

/**
 * Move the spaceShip one step to right
 */
Spaceship.prototype.moveRight = function() {
    if (this.x <= WindowHelper.getWidth() - Spaceship.STEP) {
        this.x += Spaceship.STEP;
    }

    this.draw();
}

/**
 * Move the spaceShip one step up
 */
Spaceship.prototype.moveUp = function() {
    if (this.y <= Math.round(WindowHelper.getHeight() / 2)) {
        this.y += Spaceship.STEP;
    }

    this.draw();
}

/**
 * Move the spaceShip one step down
 */
Spaceship.prototype.moveDown = function() {
    if (this.y >= Spaceship.STEP) {
        this.y -= Spaceship.STEP;
    }

    this.draw();
}

/**
 * Put the spaceShip at the bottom centered on the screen
 */
Spaceship.prototype.resetPosition = function() {
    var windowHeight = WindowHelper.getHeight();
    var windowWidth = WindowHelper.getWidth();

    this.x = Math.round((windowWidth - this.width) / 2);
    this.y = Spaceship.STEP;
    this.draw();
}

/**
 * Shoot a bullet
 */
Spaceship.prototype.shoot = function() {
    var x = this.x + Math.round(this.width / 2);
    var y = this.y + this.height;
    var bullet = new Bullet({ x: x, y: y });

    bullet.fire();

    this.bullets.push(bullet);
}

/**
 * Destroy the spaceShip
 */
Spaceship.prototype.destroy = function() {
    if (this.spaceshipDom.parentNode) {
        this.spaceshipDom.parentNode.removeChild(this.spaceshipDom);
    }
    
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].destroy();
    }
}