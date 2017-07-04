/**
 * Singleton Game Object
 */
var Game = (function() {
    var currentLevel = null;
    var currentLevelIndex = 0;
    var score = 0;

    return {
        start: start,
        pause: pause,
        resume: resume,
        stop: stop,

        getCurrentLevel: getCurrentLevel,
        addScore: addScore,
        goToNextLevel: goToNextLevel
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

    /**
     * Add to the game score
     * @param {Number} scoreToAdd 
     */
    function addScore(scoreToAdd) {
        score += scoreToAdd;
    }

    /**
     * Start the next level
     */
    function goToNextLevel() {
        currentLevelIndex++;
        currentLevel.stop();
        currentLevel = new LEVELS[currentLevelIndex];

        if (currentLevel) {
            alert('Go to the next level');
            currentLevel.start();
        }
    }
})();