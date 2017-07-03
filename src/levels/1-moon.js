/**
 * Level 1: Moon
 * @extends Level
 */
function Moon() {

    // Call the constructor of Level
    Level.call(this);

    
}

// Prototypical inheritance
Moon.prototype = Object.create(Level.prototype);
Moon.prototype.constructor = Moon;