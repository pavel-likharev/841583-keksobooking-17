'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__overlay');
  var form = document.querySelector('.ad-form');

  var limits = {
    top: mapOverlay.offsetTop,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight,
    left: mapOverlay.offsetLeft
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset
    };
  };

  // Функция для поиска координат на документе
  window.pin.getCoordsMainPin = function () {
    var coordsMainPin = getCoords(mainPin);
    var adress = document.querySelector('#address');
    adress.value = coordsMainPin.left + ', ' + coordsMainPin.bottom;
  };
  window.pin.getCoordsMainPin();

  // Производим активацию страницы
  var getPinClickHadler = function () {
    mainPin.addEventListener('mousedown', function () {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
    });
    mainPin.addEventListener('mousemove', function () {
      window.pin.getCoordsMainPin();
    });
  };
  getPinClickHadler();

  //  Обработчик для передвижения маркера
  mainPin.addEventListener('mousedown', function (evt) {
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

      var coordsTop = mainPin.offsetTop - shift.y;
      var coordsLeft = mainPin.offsetLeft - shift.x;

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

      mainPin.style.top = coordsTop + 'px';
      mainPin.style.left = coordsLeft + 'px';
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
