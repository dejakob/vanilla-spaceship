/**
 * Level 1: Mars
 * @extends Level
 */
function Mars() {

    // Call the constructor of Level
    Level.call(this);

    
}

// Prototypical inheritance
Mars.prototype = Object.create(Level);
Mars.prototype.constructor = Mars;