var WindowHelper = {
    getHeight: function() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    },

    getWidth: function() {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    }
};
