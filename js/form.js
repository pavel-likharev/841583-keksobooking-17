'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var HEIGHT_PIN = 62;

  var form = document.querySelector('.ad-form');
  var btnReset = form.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPage = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var btnSubmit = form.querySelector('.ad-form__submit');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var avatar = document.querySelector('.ad-form-header__preview img');

  var startCoordsMainPin = {};

  var getStartCoordsMainPin = function () {
    startCoordsMainPin = {
      leftCoord: mainPin.style.left,
      topCoord: mainPin.style.top
    };
    return startCoordsMainPin;
  };
  getStartCoordsMainPin();

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

  mainPin.addEventListener('mousemove', function () {
    getDisabledFieldsets(false);
  });

  var resetPage = function () {
    btnReset.click();
    getDisabledFieldsets(true);
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

  var successHandler = function () {
    var successElement = success.cloneNode(true);
    successElement.addEventListener('click', function () {
      resetPage();
      successElement.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        resetPage();
        successElement.classList.add('hidden');
      }
    });
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successElement);
    mainPage.appendChild(fragment);
  };

  // Задаём функцию действий при ошибке загрузки данных
  var errorHandler = function () {
    var errorElement = error.cloneNode(true);
    var btnCancelError = errorElement.querySelector('.error__button');
    btnCancelError.addEventListener('click', function () {
      errorElement.classList.add('hidden');
    });
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    mainPage.appendChild(fragment);
  };


  form.addEventListener('submit', function (event) {
    window.upload(new FormData(form), successHandler, errorHandler);
    btnSubmit.disabled = true;
    window.pinHadler();
    event.preventDefault();
  });

  btnReset.addEventListener('click', resetPage);
})();
