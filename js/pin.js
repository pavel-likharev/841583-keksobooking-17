'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__overlay');

  var limits = {
    top: map.offsetTop,
    right: map.offsetWidth + map.offsetLeft - mainPin.offsetWidth,
    bottom: map.offsetHeight + map.offsetTop - mainPin.offsetHeight,
    left: map.offsetLeft
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset
    };
  };

  // Функция для поиска координат на документе
  var getCoordsMainPin = function () {
    var coordsMainPin = getCoords(mainPin);
    var adress = document.querySelector('#address');
    adress.value = coordsMainPin.left + ', ' + coordsMainPin.bottom;
  };

  // Производим активацию страницы
  var getPinClickHadler = function () {
    mainPin.addEventListener('mousedown', function () {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    });
    mainPin.addEventListener('mousemove', function () {
      getCoordsMainPin();
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
