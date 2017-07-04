/**
 * Test whether two blocks hit each other
 * @param {Object} objectA 
 * @param {Number} objectA.x
 * @param {Number} objectA.y
 * @param {Number} objectA.height
 * @param {Number} objectA.width
 * @param {Object} objectB
 * @param {Number} objectB.x
 * @param {Number} objectB.y
 * @param {Number} objectB.height
 * @param {Number} objectB.width
 */
function hitTest(objectA, objectB) {
    const points = [
        [ objectB.x, objectB.y ],
        [ objectB.x + objectB.width, objectB.y ],
        [ objectB.x, objectB.y + objectB.height ],
        [ objectB.x + objectB.width, objectB.y + objectB.height ]
    ];

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var x = point[0];
        var y = point[1];

        if (x >= objectA.x && x <= objectA.x + objectA.width) {
            if (y >= objectA.y && y <= objectA.y + objectA.height) {
                return true;
            }
        }
    }

    return false;
}