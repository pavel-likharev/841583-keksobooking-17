'use strict';
(function () {

  var pin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__overlay');

  var limits = {
    top: map.offsetTop,
    right: map.offsetWidth + map.offsetLeft - pin.offsetWidth,
    bottom: map.offsetHeight + map.offsetTop - pin.offsetHeight,
    left: map.offsetLeft
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordsTop = pin.offsetTop - shift.y;
      var coordsLeft = pin.offsetLeft - shift.x;

      if (coordsTop < limits.top) {
        coordsTop = limits.top;
      } else if (coordsTop > limits.bottom) {
        coordsTop = limits.bottom;
      }

      if (coordsLeft < limits.left) {
        coordsLeft = limits.left;
      } else if (coordsLeft > limits.right) {
        coordsLeft = limits.right;
      }

      pin.style.top = coordsTop + 'px';
      pin.style.left = coordsLeft + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

