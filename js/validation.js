'use strict';

(function () {
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var btnSubmitForm = document.querySelector('.ad-form__submit');

  var price = document.querySelector('#price');
  var selectTypesHouse = document.querySelector('#type');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');

  var Rooms = {
    ONE_ROOMS: roomsNumber.options[0],
    TWO_ROOMS: roomsNumber.options[1],
    THREE_ROOMS: roomsNumber.options[2],
    ONE_HUNDRED_ROOMS: roomsNumber.options[3]
  };

  var Guests = {
    THREE_GUESTS: guestsNumber.options[0],
    TWO_GUESTS: guestsNumber.options[1],
    ONE_GUESTS: guestsNumber.options[2],
    NONE_GUESTS: guestsNumber.options[3]
  };


  // Функция поиска выбранного типа жилья и условие добавления минимального прайса
  var addMinPrice = function () {
    for (var i = 0; i < selectTypesHouse.options.length; i++) {
      var typeHouse = selectTypesHouse.options[i];
      if (typeHouse.selected) {
        var selectedType = typeHouse.value;
        break;
      }
    }
    // Тут можно написать цикл с массивом типов жилья, массивом прайсов и
    // их перебором, с совпадением из верхнего цикла вставлять цену
    if (selectedType === 'bungalo') {
      price.min = PRICE_BUNGALO;
      price.placeholder = PRICE_BUNGALO;
    } else if (selectedType === 'flat') {
      price.min = PRICE_FLAT;
      price.placeholder = PRICE_FLAT;
    } else if (selectedType === 'house') {
      price.min = PRICE_HOUSE;
      price.placeholder = PRICE_HOUSE;
    } else if (selectedType === 'palace') {
      price.min = PRICE_PALACE;
      price.placeholder = PRICE_PALACE;
    }
  };
  selectTypesHouse.addEventListener('change', addMinPrice);

  // Функции синхронизации даты заезда и выезда
  var syncTimeIn = function () {
    for (var i = 0; i < timeIn.options.length; i++) {
      var checkTimeIn = timeIn.options[i];

      if (checkTimeIn.selected) {
        timeOut[i].selected = true;
        break;
      }

    }
  };

  var syncTimeOut = function () {
    for (var i = 0; i < timeIn.options.length; i++) {
      var checkTimeOut = timeOut.options[i];

      if (checkTimeOut.selected) {
        timeIn[i].selected = true;
        break;
      }
    }
  };

  timeIn.addEventListener('change', syncTimeIn);
  timeOut.addEventListener('change', syncTimeOut);

  // Соответствие кол-ва гостей кол-ву комнат

  var syncRoomsGuests = function () {
    if (Rooms.ONE_ROOMS.selected && Guests.TWO_GUESTS.selected) {
      guestsNumber.setCustomValidity('Выберите две комнаты');
    } else if (Rooms.ONE_ROOMS.selected && Guests.THREE_GUESTS.selected) {
      guestsNumber.setCustomValidity('Выберите три комнаты');
    } else if (Rooms.TWO_ROOMS.selected && Guests.THREE_GUESTS.selected) {
      guestsNumber.setCustomValidity('Выберите три комнаты');
    } else if ((Rooms.ONE_ROOMS.selected || Rooms.TWO_ROOMS.selected || Rooms.THREE_ROOMS.selected) && Guests.NONE_GUESTS.selected) {
      guestsNumber.setCustomValidity('Выберите сто комнат');
    } else if (Rooms.ONE_HUNDRED_ROOMS.selected && (Guests.ONE_GUESTS.selected || Guests.TWO_GUESTS.selected || Guests.THREE_GUESTS.selected)) {
      guestsNumber.setCustomValidity('Выберите отсутствие гостей');
    } else if (
      (Rooms.ONE_ROOMS.selected && Guests.ONE_GUESTS.selected) ||
      (Rooms.TWO_ROOMS.selected && (Guests.ONE_GUESTS.selected || Guests.TWO_GUESTS.selected)) ||
      (Rooms.THREE_ROOMS.selected && (Guests.ONE_GUESTS.selected || Guests.TWO_GUESTS.selected || Guests.THREE_GUESTS.selected)) ||
      (Rooms.ONE_HUNDRED_ROOMS.selected && Guests.NONE_GUESTS.selected)) {
      guestsNumber.setCustomValidity('');
    }
  };
  btnSubmitForm.addEventListener('click', syncRoomsGuests);
  roomsNumber.addEventListener('change', syncRoomsGuests);
  guestsNumber.addEventListener('change', syncRoomsGuests);


})();
