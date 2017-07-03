(function() {
    'use strict';

    var options = { capture: false, once: true };

    // You can use startApplication here, because it's a named function (hoisting)
    document.addEventListener('ready', startApplication, options);

    /**
     * Start the application
     */
    function startApplication() {
        
    }
})();