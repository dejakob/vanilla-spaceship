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