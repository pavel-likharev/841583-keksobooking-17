'use strict';
// Задаём массив с индексами адресов картинок
var adressImage = ['01', '02', '03', '04', '05', '06', '07', '08'];

// Задаём массив с вариантами квартир и функцию рандомного получения варианта
var typeOffer = ['palace', 'flat', 'house', 'bungalo'];
function getTypeOffer() {
  return Math.floor(Math.random() * (typeOffer.length - 0)) + 0;
}
// Задаём функции с определением координат местоположения
var sizeMap = document.querySelector('.map__overlay').offsetWidth;
function getLocationX() {
  return Math.floor(Math.random() * (sizeMap - 0 + 1)) + 0;
}
function getLocationY() {
  return Math.floor(Math.random() * (630 - 130 + 1)) + 130;
}
// Задаём функцию генерации случайных данных для маркеров
function generateListOffers(listNumberOffers) {
  for (var j = 0; j < 8; j++) {
    if (listNumberOffers === j) {
      return {
        author: {
          avatar: 'img/avatars/user' + adressImage[j] + '.png'
        },
        offer: {
          type: typeOffer[getTypeOffer()]
        },
        location: {
          x: getLocationX(),
          y: getLocationY()
        }
      };
    }
  }
  // Линтер ругается, что return должен быть в конце функции,
  // а если объект завернуть в переменную, то ломается массив
  return {
    author: {
      avatar: 'img/avatars/user' + adressImage[j] + '.png'
    },
    offer: {
      type: typeOffer[getTypeOffer()]
    },
    location: {
      x: getLocationX(),
      y: getLocationY()
    }
  };
}
// Формируем массив с помощью функции генерации
var offers = [generateListOffers(0), generateListOffers(1), generateListOffers(2), generateListOffers(3), generateListOffers(4), generateListOffers(5), generateListOffers(6), generateListOffers(7)];
// Открываем карту
document.querySelector('.map').classList.remove('map--faded');
var listPins = document.querySelector('.map__pins');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinImage = pin.querySelector('img');
// Задаём функцию создания одного маркера
var renderPin = function (offer) {
  var pinElement = pin.cloneNode(true);

  pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.type;

  return pinElement;
};
// Задаём функцию создания необходимого количества маркеров
var createListOffers = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  listPins.appendChild(fragment);
};

createListOffers();
