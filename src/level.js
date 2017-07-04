/**
 * Main Level Object
 */
function Level() {
    this.isRunning = false;

    this.addKeyListeners = function() {
        document.body.addEventListener('keydown', handleKeyDown.bind(this));
    }

    this.removeKeyListeners = function() {
        document.body.removeEventListener('keydown', handleKeyDown.bind(this));
    }

    function handleKeyDown(eventData) {
        if (this.isRunning) {
            switch (eventData.keyCode) {
                case Level.KEY_CODES.UP:
                    return moveSpaceshipUp.call(this);
                case Level.KEY_CODES.RIGHT:
                    return moveSpaceshipRight.call(this);
                case Level.KEY_CODES.DOWN:
                    return moveSpaceshipDown.call(this);
                case Level.KEY_CODES.LEFT:
                    return moveSpaceshipLeft.call(this);
                case Level.KEY_CODES.SPACE:
                    return fireBullet.call(this);
                case Level.KEY_CODES.P:
                    return this.pause();    
            }
        }
        
        // Press any key to resume
        else {
            this.resume();
        }
    }

    function moveSpaceshipUp() {
        this.spaceship.moveUp();
    }

    function moveSpaceshipRight() {
        this.spaceship.moveRight();
    }

    function moveSpaceshipDown() {
        this.spaceship.moveDown();
    }

    function moveSpaceshipLeft() {
        this.spaceship.moveLeft();
    }

    function fireBullet() {
        this.spaceship.shoot();
    }
}

Level.KEY_CODES = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,
    SPACE: 32,
    P: 80
};

// Default level number is 1
Level.prototype.levelNumber = 1;

Level.prototype.start = function() {
    this.isRunning = true;
    this.spaceship = new Spaceship();
    this.spaceship.resetPosition();
    this.addKeyListeners();
    Timer.start();

    if (
        this.obstacles &&
        typeof this.obstacles.length === 'number'
    ) {
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].invade();
        }
    }
}

Level.prototype.pause = function() {
    this.isRunning = false;
    Timer.pause();
}

Level.prototype.resume = function() {
    this.isRunning = true;
    Timer.start();
}

Level.prototype.stop = function() {
    Timer.stop();
    this.isRunning = false;
    this.spaceship.destroy();
    this.removeKeyListeners();
}