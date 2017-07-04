/**
 * Obstacle you need to get rid of
 */
function Obstacle(options) {
    var obstacleOptions = options || {};

    this.height = Obstacle.DEFAULT_HEIGHT;
    this.width = Obstacle.DEFAULT_WIDTH;
    this.step = Obstacle.DEFAULT_STEP;
    this.score = Obstacle.DEFAULT_SCORE;
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
Obstacle.DEFAULT_SCORE = 100;

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
        Game.getCurrentLevel().dodgeObstacle(this);
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