/**
 * @author dejakob
 * Immediate Invoked Function Expression,
 * so that variables are wrapped in a closure.
 * Nothing in here should be manipulated from outside
 */
(function() {
    'use strict';

    var options = { capture: false, once: true };

    // You can use startApplication here, because it's a named function (hoisting)
    window.addEventListener('load', startApplication, options);

    /**
     * Start the application
     */
    function startApplication() {
        Game.start();
    }
})();