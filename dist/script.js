/**
 * Bullet Object
 * @param {Object} startPosition 
 * @param {Number} startPosition.x
 * @param {Number} startPosition.y
 */
function Bullet(startPosition) {
    if (
        !startPosition ||
        startPosition.x !== 'number' ||
        startPosition.y !== 'number'
    ) {
        throw new Error('Invalid start position, both x and y properties should be numbers');
    }

    this.x = startPosition.x;
    this.y = startPosition.y;

    this.initializeDom = function() {
        this.bulletDomElement = document.createElement('div');
        document.body.appendChild(this.bulletDomElement);
    }

    this.draw = function() {
        this.bulletDomElement.style.left = this.x + 'px';
        this.bulletDomElement.style.bottom = this.y + 'px';
        this.bulletDomElement.style.backgroundColor = 'green';
    }

    this.initializeDom();
    this.draw();
}

Bullet.STEP = 10;
Bullet.INTERVAL = 50;

/**
 * Fire the bullet
 */
Bullet.prototype.fire = function() {
    this.interval = setInterval(tick.bind(this), Bullet.INTERVAL);

    function tick() {
        this.y -= Bullet.STEP;
        this.draw();
    }
}

/**
 * Destroy the bullet
 */
Bullet.prototype.destroy = function() {
    clearInterval(this.interval);
    this.bulletDomElement.parentElement.removeChild(this.bulletDomElement);
}

/**
 * Singleton Game Object
 */
var Game = (function() {
    var currentLevel = null;

    return {
        start: start,
        pause: pause,
        resume: resume,
        stop: stop
    };

    function start() {
        var FirstLevel = LEVELS[0];
        currentLevel = new FirstLevel();

        console.log('current level', currentLevel);
        currentLevel.start();
    }

    function pause() {
        currentLevel.pause();
    }

    function resume() {
        currentLevel.resume();
    }

    function stop() {
        currentLevel.stop();
        currentLevel = null;
    }
})();
/**
 * @author dejakob
 * Immediate Invoked Function Expression,
 * so that variables are wrapped in a closure.
 * Nothing in here should be manipulated from outside
 */
(function() {
    'use strict';

    var options = { capture: false, once: true };

    // You can use startApplication here, because it's a named function (hoisting)
    window.addEventListener('load', startApplication, options);

    /**
     * Start the application
     */
    function startApplication() {
        Game.start();
    }
})();
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
    SPACE: 32
};

// Default level number is 1
Level.prototype.levelNumber = 1;

Level.prototype.start = function() {
    this.isRunning = true;
    this.spaceship = new Spaceship();
    this.spaceship.resetPosition();
    this.addKeyListeners();
}

Level.prototype.pause = function() {
    this.isRunning = false;
}

Level.prototype.resume = function() {
    this.isRunning = true;
}

Level.prototype.stop = function() {
    this.isRunning = false;
    this.spaceship.destroy();
    this.removeKeyListeners();
}
/**
 * Obstacle you need to get rid of
 */
function Obstacle() {

}
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
    var x = this.x - Math.round(this.width / 2);
    var y = this.y + this.height;
    var bullet = new Bullet({ x: x, y: y });

    this.bullets.push(bullet);
}

/**
 * Destroy the spaceShip
 */
Spaceship.prototype.destroy = function() {
    this.spaceshipDom.parentElement.removeChild(this.spaceshipDom);
}
var WindowHelper = {
    getHeight: function() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    },

    getWidth: function() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }
};

/**
 * Level 1: Moon
 * @extends Level
 */
function Moon() {

    // Call the constructor of Level
    Level.call(this);

    
}

// Prototypical inheritance
Moon.prototype = Object.create(Level.prototype);
Moon.prototype.constructor = Moon;
/**
 * Level 1: Mars
 * @extends Level
 */
function Mars() {

    // Call the constructor of Level
    Level.call(this);

    
}

// Prototypical inheritance
Mars.prototype = Object.create(Level.prototype);
Mars.prototype.constructor = Mars;
// Collection of all active levels
var LEVELS = [
    Moon,
    Mars
];
