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