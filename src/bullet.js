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
