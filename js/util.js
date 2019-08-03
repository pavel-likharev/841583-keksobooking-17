'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  window.util = {
    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    },
    ESC_KEYCODE: 27
  };

})();
