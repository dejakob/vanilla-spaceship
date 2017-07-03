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
}

// Default level number is 1
Level.prototype.levelNumber = 1;

Level.prototype.start = function() {
    this.isRunning = true;
    this.spaceship = new Spaceship();
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
    this.spaceship.destroy();
}
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
