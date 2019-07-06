'use strict';

(function () {
  var SIZE_PIN = 40;
  var AMOUNT_OFFERS = 8;
  var MAP_HEIGHT_MIN = 130 + SIZE_PIN;
  var MAP_HEIGHT_MAX = 630 + SIZE_PIN;
  var MAP_WIDTH_MIN = document.querySelector('.map__overlay').offsetLeft + SIZE_PIN;
  var MAP_WIDTH_MAX = document.querySelector('.map__overlay').offsetWidth - SIZE_PIN;

  // Задаём массив типов предложений и функцию случайной выдачи типа
  var typeOffer = ['palace', 'flat', 'house', 'bungalo'];
  function getTypeOffer() {
    return Math.floor(Math.random() * typeOffer.length);
  }

  // Задаём функции с определением координат местоположения
  function getLocationX() {
    return Math.floor(Math.random() * (MAP_WIDTH_MAX - MAP_WIDTH_MIN + 1)) + MAP_WIDTH_MIN;
  }
  function getLocationY() {
    return Math.floor(Math.random() * (MAP_HEIGHT_MAX - MAP_HEIGHT_MIN + 1)) + MAP_HEIGHT_MIN;
  }

  // Задаём функцию генерации случайных данных для одного маркера
  var generateRandomOffer = function () {
    var randomOffer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: typeOffer[getTypeOffer()]
      },
      location: {
        x: getLocationX(),
        y: getLocationY()
      }
    };
    return randomOffer;
  };

  window.offers = [];
  for (var i = 0; i < AMOUNT_OFFERS; i++) {
    window.offers.push(generateRandomOffer());
  }

})();
