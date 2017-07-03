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