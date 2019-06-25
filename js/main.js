'use strict';
// Задаём константы
var AMOUNT_OFFERS = 8;
var SIZE_PIN = 40;
var MAP_HEIGHT_MIN = 130 + SIZE_PIN;
var MAP_HEIGHT_MAX = 630 + SIZE_PIN;
var MAP_WIDTH_MIN = document.querySelector('.map__overlay').offsetLeft + SIZE_PIN;
var MAP_WIDTH_MAX = document.querySelector('.map__overlay').offsetWidth - SIZE_PIN;
// Функция для поиска координат главной метки
var mainPin = document.querySelector('.map__pin--main');
var getCoordsMainPin = function () {
  var coordsMainPin = getCoords(mainPin);
  var adress = document.querySelector('#address');
  adress.value = coordsMainPin.left + ', ' + coordsMainPin.bottom;
};
getCoordsMainPin();
// Задаём массив типов предложений и функцию случайной выдачи типа
var typeOffer = ['palace', 'flat', 'house', 'bungalo'];
function getTypeOffer() {
  return Math.floor(Math.random() * (typeOffer.length - 0)) + 0;
}
// Задаём функции с определением координат местоположения
function getLocationX() {
  return Math.floor(Math.random() * (MAP_WIDTH_MAX - MAP_WIDTH_MIN + 1)) + MAP_WIDTH_MIN;
}
function getLocationY() {
  return Math.floor(Math.random() * (MAP_HEIGHT_MAX - MAP_HEIGHT_MIN + 1)) + MAP_HEIGHT_MIN;
}
// Задаём функцию генерации случайных данных для одного маркера
function generateRandomOffer() {
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
}
// Формируем массив с помощью функции генерации
var offers = [];
for (var i = 0; i < AMOUNT_OFFERS; i++) {
  offers.push(generateRandomOffer());
}
// Открываем карту
//
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

  for (var j = 0; j < offers.length; j++) {
    var generatedPin = renderPin(offers[j]);
    fragment.appendChild(generatedPin);
  }

  listPins.appendChild(fragment);
};

// Module4
// Блокируем все fieldset
var getDisabledFieldsets = function (value) {
  var allFieldset = document.querySelectorAll('.ad-form__element');
  var inputHeader = document.querySelector('.ad-form-header');
  inputHeader.disabled = value;
  for (var j = 0; j < allFieldset.length; j++) {
    allFieldset[j].disabled = value;
  }
};
getDisabledFieldsets(true);

// Функция для поиска координат на документе
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset
  };
}

// Производим активацию страницы
var getPinClickHadler = function () {
  mainPin.addEventListener('click', function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    getDisabledFieldsets(false);
    createListOffers();
  });
  mainPin.addEventListener('mouseup', function () {
    getCoordsMainPin();
  });
};
getPinClickHadler();
