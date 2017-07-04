/**
 * Bullet Object
 * @param {Object} startPosition 
 * @param {Number} startPosition.x
 * @param {Number} startPosition.y
 */
function Bullet(startPosition) {
    if (
        !startPosition ||
        typeof startPosition.x !== 'number' ||
        typeof startPosition.y !== 'number'
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
        this.bulletDomElement.style.height = '10px';
        this.bulletDomElement.style.width = '1px';
        this.bulletDomElement.style.backgroundColor = 'green';
        this.bulletDomElement.style.position = 'absolute';
    }

    this.initializeDom();
    this.draw();
}

Bullet.STEP = 10;
 
/**
 * Fire the bullet
 */
Bullet.prototype.fire = function() {
    this.interval = Timer.addTick(tick.bind(this));

    function tick() {
        this.y += Bullet.STEP;
        this.draw();

        if (this.y > WindowHelper.getHeight()) {
            this.destroy();
        }

        // Hit test with every obstacle
        // Remove obstacle on hit
        var obstacles = Game.getCurrentLevel().obstacles;

        if (obstacles) {
            for (let i = 0; i < obstacles.length; i++) {
                var obstacle = obstacles[i];

                if (hitTest(obstacle, this)) {
                    obstacle.destroy();
                    Game.getCurrentLevel().obstacles.splice(Game.getCurrentLevel().obstacles.indexOf(obstacle), 1);
                    return this.destroy();
                }
            }
        }
    }
}

/**
 * Destroy the bullet
 */
Bullet.prototype.destroy = function() {
    if (this.bulletDomElement.parentNode) {
        this.bulletDomElement.parentNode.removeChild(this.bulletDomElement);
    }

    Timer.removeTick(this.interval);
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
        stop: stop,

        getCurrentLevel: getCurrentLevel
    };

    /**
     * Start the game
     */
    function start() {
        var FirstLevel = LEVELS[0];
        
        currentLevel = new FirstLevel();
        currentLevel.start();
    }

    /**
     * Pause the game
     */
    function pause() {
        currentLevel.pause();
    }

    /**
     * Resume the game
     */
    function resume() {
        currentLevel.resume();
    }

    /**
     * Stop the game
     */
    function stop() {
        currentLevel.stop();
        currentLevel = null;
    }

    /**
     * Returns the current level
     * @returns {Level}
     */
    function getCurrentLevel() {
        return currentLevel;
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
        eventData.preventDefault();

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

    if (
        this.obstacles &&
        typeof this.obstacles.length === 'number'
    ) {
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].destroy();
        }
    }
}
/**
 * Obstacle you need to get rid of
 */
function Obstacle(options) {
    var obstacleOptions = options || {};

    this.height = Obstacle.DEFAULT_HEIGHT;
    this.width = Obstacle.DEFAULT_WIDTH;
    this.step = Obstacle.DEFAULT_STEP;
    this.x = obstacleOptions.x || 0;
    this.y = WindowHelper.getHeight() + (obstacleOptions.y || 0);

    this.initDomObstacle = function() {
        this.obstacleDomElement = document.createElement('div');
        document.body.appendChild(this.obstacleDomElement);
    };
    this.draw = function() {
        this.obstacleDomElement.style.position = 'absolute';
        this.obstacleDomElement.style.height = this.height + 'px';
        this.obstacleDomElement.style.width = this.width + 'px';
        this.obstacleDomElement.style.bottom = this.y + 'px';
        this.obstacleDomElement.style.left = this.x + 'px';
        this.obstacleDomElement.style.backgroundColor = 'darkblue';
    };

    this.initDomObstacle();
    this.draw();
}

Obstacle.DEFAULT_HEIGHT = 100;
Obstacle.DEFAULT_WIDTH = 100;
Obstacle.DEFAULT_STEP = 3;

/**
 * Start invading space by going down
 */
Obstacle.prototype.invade = function() {
    this.interval = Timer.addTick(tick.bind(this));

    function tick() {
        this.moveDown.call(this);

        var isHittingSpaceship = hitTest(
            Game.getCurrentLevel().spaceship,
            this
        );

        if (isHittingSpaceship) {
            Game.stop();
        }
    }
}

/**
 * Move the obstacle down
 */
Obstacle.prototype.moveDown = function() {
    this.y -= this.step;

    this.draw();

    if (this.y < -this.height) {
        this.destroy();
    }
}

/**
 * Destroy the obstacle
 */
Obstacle.prototype.destroy = function() {
    if (this.obstacleDomElement.parentNode) {
        this.obstacleDomElement.parentNode.removeChild(this.obstacleDomElement);
    }
    
    Timer.removeTick(this.interval);
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
/**
 * Single instance Timer
 */
var Timer = (function() {
    this.interval = null;
    this.tickEvents = [];

    return {
        start: start.bind(this),
        pause: pause.bind(this),
        stop: stop.bind(this),
        addTick: addTickEvent.bind(this),
        removeTick: removeTickEvent.bind(this)
    };

    /**
     * Start the Global timer
     */
    function start() {
        this.interval = setInterval(tick.bind(this), 50);
    }

    /**
     * Add a listener that should get triggered on every timer tick
     * @param {Function} tickEvent 
     */
    function addTickEvent(tickEvent) {
        this.tickEvents.push(tickEvent);
        return tickEvent;
    }

    /**
     * Remove an earlier added listener
     * @param {Function} tickEvent 
     */
    function removeTickEvent(tickEvent) {
        this.tickEvents.splice(this.tickEvents.indexOf(tickEvent), 1);
    }

    /**
     * Gets triggered each interval tick
     */
    function tick() {
        for (var i = 0; i < this.tickEvents.length; i++) {
            this.tickEvents[i]();
        }
    }

    /**
     * Pause the timer
     */
    function pause() {
        clearInterval(this.interval);
    }

    /**
     * Stop the timer
     */
    function stop() {
        clearInterval(this.interval);
        this.tickEvents = [];
    }
})();

Timer.INTERVAL = 50;
/**
 * Test whether two blocks hit each other
 * @param {Object} objectA 
 * @param {Number} objectA.x
 * @param {Number} objectA.y
 * @param {Number} objectA.height
 * @param {Number} objectA.width
 * @param {Object} objectB
 * @param {Number} objectB.x
 * @param {Number} objectB.y
 * @param {Number} objectB.height
 * @param {Number} objectB.width
 */
function hitTest(objectA, objectB) {
    const points = [
        [ objectB.x, objectB.y ],
        [ objectB.x + objectB.width, objectB.y ],
        [ objectB.x, objectB.y + objectB.height ],
        [ objectB.x + objectB.width, objectB.y + objectB.height ]
    ];

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var x = point[0];
        var y = point[1];

        if (x >= objectA.x && x <= objectA.x + objectA.width) {
            if (y >= objectA.y && y <= objectA.y + objectA.height) {
                return true;
            }
        }
    }

    return false;
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

    var obstacleWidth = Obstacle.DEFAULT_WIDTH;
    var windowWidth = WindowHelper.getWidth();

    this.obstacles = [];

    addRow.call(this, 4, 0);
    addRow.call(this, 3, 150);
    addRow.call(this, 2, 300);
    addRow.call(this, 1, 500);

    /**
     * Add a horizontal row of Obstacles to the obstacles list
     * @param {Number} columns 
     * @param {Number} yOffset
     */
    function addRow(columns, yOffset) {
        var amountOfSpacings = columns - 1;
        var totalWidthOfObstaclesInRow = obstacleWidth * columns;
        var spacingBetween = amountOfSpacings === 0 ?
            0 :
            Math.round((windowWidth - totalWidthOfObstaclesInRow) / amountOfSpacings);

        for (var col = 0; col < columns; col++) {
            this.obstacles.push(new Obstacle({ x: col * (spacingBetween + obstacleWidth), y: yOffset }));
        }
    }
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
