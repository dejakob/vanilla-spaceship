/**
 * Single instance Timer
 */
var Timer = (function() {
    this.interval = null;
    this.tickEvents = [];

    return {
        start: start.bind(this),
        pause: pause.bind(this),
        addTick: addTickEvent.bind(this),
        removeTick: removeTickEvent.bind(this)
    };

    function start() {
        this.interval = setInterval(tick.bind(this), 50);
    }

    function addTickEvent(tickEvent) {
        this.tickEvents.push(tickEvent);
        return tickEvent;
    }

    function removeTickEvent(tickEvent) {
        this.tickEvents.splice(this.tickEvents.indexOf(tickEvent), 1);
    }

    function tick() {
        for (var i = 0; i < this.tickEvents.length; i++) {
            this.tickEvents[i]();
        }
    }

    function pause() {
        clearInterval(this.interval);
    }
})();

Timer.INTERVAL = 50;