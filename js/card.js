'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var listPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

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
  var createListOffers = function () {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < window.offers.length; j++) {
      var generatedPin = renderPin(window.offers[j]);
      fragment.appendChild(generatedPin);
    }

    listPins.appendChild(fragment);
  };

  mainPin.addEventListener('mouseup', createListOffers);

})();
