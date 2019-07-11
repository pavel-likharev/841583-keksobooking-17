'use strict';

(function () {
  var AMOUNT_OFFERS = 9;

  var mainPin = document.querySelector('.map__pin--main');
  var listPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainPage = document.querySelector('main');

  // Задаём функцию создания одного маркера
  var renderPin = function (offer) {
    var pinElement = pin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.type;

    return pinElement;
  };
  // Задаём функцию создания необходимого количества маркеров
  var successHandler = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < AMOUNT_OFFERS; i++) {
      var generatedPin = renderPin(offers[i]);
      fragment.appendChild(generatedPin);
    }

    listPins.appendChild(fragment);
  };

  var errorHandler = function () {
    var errorElement = error.cloneNode(true);
    mainPage.appendChild(errorElement);
  };

  mainPin.addEventListener('mouseup', function () {
    window.load(successHandler, errorHandler);
  });

})();
