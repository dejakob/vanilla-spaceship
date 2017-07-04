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