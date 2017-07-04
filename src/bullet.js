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
    }
}

/**
 * Destroy the bullet
 */
Bullet.prototype.destroy = function() {
    try {
        this.bulletDomElement.parentNode.removeChild(this.bulletDomElement);
    }
    finally {
        Timer.removeTick(this.interval);
    }
}
