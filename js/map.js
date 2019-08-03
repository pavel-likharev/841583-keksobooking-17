'use strict';

(function () {
  var AMOUNT_OFFERS = 5;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var listPins = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.offers = [];

  // Функция действий при успешной загрузке данных
  var successLoad = function (data) {
    window.offers = data;
  };

  window.data.load(successLoad, window.popup.error);

  // Функция создания одного маркера через шаблон
  var renderPin = function (offer) {
    var pinElement = templatePin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.type;
    pinElement.classList.add('render__pin');
    pinElement.addEventListener('click', function () {
      window.removeCard();
      window.render(offer);
    });

    return pinElement;
  };

  // Функция создания списка предложений на карте
  window.renderMap = function (listOffers) {
    window.removeOffers();

    var fragment = document.createDocumentFragment();
    var takeNumber = listOffers.length > AMOUNT_OFFERS ? AMOUNT_OFFERS : listOffers.length;
    for (var i = 0; i < takeNumber; i++) {
      var generatedPin = renderPin(listOffers[i]);
      fragment.appendChild(generatedPin);
    }
    listPins.appendChild(fragment);
  };

  // Функция удаления отрисованного списка маркеров
  window.removeOffers = function () {
    var renderPins = listPins.querySelectorAll('.render__pin');
    for (var i = 0; i < renderPins.length; i++) {
      listPins.removeChild(renderPins[i]);
    }
  };

  // Функция удаления отрисованной карточки
  window.removeCard = function () {
    var visibleCard = map.querySelector('.visible__card');
    if (visibleCard !== null) {
      map.removeChild(visibleCard);
    }
  };

  // Функция, запускающая создание списка предложений
  var callRender = function () {
    window.renderMap(window.offers);
    mainPin.removeEventListener('mouseup', callRender);
  };
  window.pinHadler = function () {
    mainPin.addEventListener('mouseup', callRender);
  };
  window.pinHadler();

})();
