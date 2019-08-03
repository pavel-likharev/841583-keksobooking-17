'use strict';

(function () {
  var HEIGHT_POINTER_PIN = 84;
  var HEIGHT_CIRCLE_PIN = 62;

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__overlay');
  var form = document.querySelector('.ad-form');


  var limitsMap = {
    top: 130,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    bottom: 630,
    left: mapOverlay.offsetLeft
  };

  // Функция получения координат главного маркера
  var getCoords = function (elem, height) {
    var coords = elem.getBoundingClientRect();

    return {
      left: (coords.left + (coords.width / 2)) + pageXOffset,
      top: (coords.top + height) + pageYOffset
    };
  };

  // Функция для поиска координат главного маркера
  window.pin.getCoordsMainPin = function (height) {
    var coordsMainPin = getCoords(mainPin, height);
    var adress = form.querySelector('#address');
    adress.value = coordsMainPin.left + ', ' + coordsMainPin.top;
  };
  window.pin.getCoordsMainPin(HEIGHT_CIRCLE_PIN);

  // Функция активации страницы
  var getPinClickHadler = function () {
    mainPin.addEventListener('mousedown', function () {
      window.pin.getCoordsMainPin(HEIGHT_POINTER_PIN);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
    });
    mainPin.addEventListener('mousemove', function () {
      window.pin.getCoordsMainPin(HEIGHT_POINTER_PIN);
    });
  };
  getPinClickHadler();

  // Обработчик для передвижения маркера
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

      if (coordsTop < limitsMap.top) {
        coordsTop = limitsMap.top;
      } else if (coordsTop > limitsMap.bottom) {
        coordsTop = limitsMap.bottom;
      }

      if (coordsLeft < limitsMap.left) {
        coordsLeft = limitsMap.left;
      } else if (coordsLeft > limitsMap.right) {
        coordsLeft = limitsMap.right;
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
