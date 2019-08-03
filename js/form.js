'use strict';

(function () {
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var HEIGHT_PIN = 62;

  var form = document.querySelector('.ad-form');
  var btnReset = form.querySelector('.ad-form__reset');

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPage = document.querySelector('main');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');

  var photosContainer = document.querySelector('.ad-form__photo-container');
  var avatar = document.querySelector('.ad-form-header__preview img');

  // Узнаём первоначальные координаты главного пина
  var startCoordsMainPin = {};

  (function () {
    startCoordsMainPin = {
      leftCoord: mainPin.style.left,
      topCoord: mainPin.style.top
    };
    return startCoordsMainPin;
  })();

  // Функция блокировки формы
  var getDisabledFieldsets = function (value) {
    var allFieldset = document.querySelectorAll('.ad-form__element');
    var inputHeader = document.querySelector('.ad-form-header');
    inputHeader.disabled = value;
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].disabled = value;
    }
  };
  getDisabledFieldsets(true);

  mainPin.addEventListener('mousemove', function () {
    getDisabledFieldsets(false);
  });

  // Функция сброса страницы
  var resetPage = function () {
    btnReset.click();
    form.classList.add('ad-form--disabled');
    mainPin.style.left = startCoordsMainPin.leftCoord;
    mainPin.style.top = startCoordsMainPin.topCoord;
    map.classList.add('map--faded');
    window.pinHadler();
    window.pin.getCoordsMainPin(HEIGHT_PIN);
    window.removeOffers();
    var photos = photosContainer.querySelectorAll('.upload__photo');
    for (var i = 0; i < photos.length; i++) {
      photosContainer.removeChild(photos[i]);
    }
    avatar.src = AVATAR_DEFAULT;

  };

  // Функция действий при успешной загрузки данных на сервер
  var successSend = function () {
    var successElement = templateSuccess.cloneNode(true);
    successElement.addEventListener('click', function () {
      resetPage();
      window.pinHadler();
      successElement.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscPressed) {
        evt.preventDefault();
        resetPage();
        successElement.classList.add('hidden');

      }
    });
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successElement);
    mainPage.appendChild(fragment);
  };

  // Назначение обработчиков
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.send(new FormData(form), successSend, window.popup.error);
  });

  btnReset.addEventListener('click', resetPage);
  btnReset.addEventListener('click', getDisabledFieldsets(true));
})();
