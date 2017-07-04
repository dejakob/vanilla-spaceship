/**
 * Obstacle you need to get rid of
 */
function Obstacle(options) {
    var obstacleOptions = options || {};

    this.height = Obstacle.DEFAULT_HEIGHT;
    this.width = Obstacle.DEFAULT_WIDTH;
    this.step = Obstacle.DEFAULT_STEP;
    this.x = 0;
    this.y = WindowHelper.getHeight();

    this.initDomObstacle = function() {
        this.obstacleDomElement = document.createElement('div');
        document.body.appendChild(this.obstacleDomElement);
    };
    this.draw = function() {
        this.obstacleDomElement.style.position = 'absolute';
        this.obstacleDomElement.style.height = this.height + 'px';
        this.obstacleDomElement.style.width = this.width + 'px';
        this.obstacleDomElement.style.backgroundColor = 'darkblue';
    };

    this.initDomObstacle();
    this.draw();
}

Obstacle.DEFAULT_HEIGHT = 100;
Obstacle.DEFAULT_WIDTH = 100;
Obstacle.DEFAULT_STEP = 10;

/**
 * Move the obstacle down
 */
Obstacle.prototype.moveDown = function() {
    this.y -= Obstacle.step;
}

/**
 * Destroy the obstacle
 */
Obstacle.prototype.destroy = function() {
    this.obstacleDomElement.parentNode.removeElement(this.obstacleDomElement);
} 