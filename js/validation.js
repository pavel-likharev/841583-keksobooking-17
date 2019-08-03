'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var btnSubmitForm = form.querySelector('.ad-form__submit');

  var price = form.querySelector('#price');
  var selectTypesHouse = form.querySelector('#type');

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var roomsNumber = form.querySelector('#room_number');
  var guestsNumber = form.querySelector('#capacity');

  // Функция поиска выбранного типа жилья и условие добавления минимального прайса
  var addMinPrice = function () {
    for (var i = 0; i < selectTypesHouse.options.length; i++) {
      var typeHouse = selectTypesHouse.options[i];
      if (typeHouse.selected) {
        var selectedType = typeHouse.value;
        break;
      }
    }

    var priceList = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };

    price.min = priceList[selectedType];
    price.placeholder = priceList[selectedType];
  };
  selectTypesHouse.addEventListener('change', addMinPrice);

  // Функции синхронизации даты заезда и выезда
  var onCheckInTimeChange = function () {
    timeOut.value = timeIn.value;
  };
  var onCheckOutTimeChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onCheckInTimeChange);
  timeOut.addEventListener('change', onCheckOutTimeChange);

  // Функция соответствия кол-ва гостей кол-ву комнат
  var syncRoomsGuests = function () {
    var roomToGuestMessage = '';
    if (roomsNumber.value !== '100') {
      if (guestsNumber.value > roomsNumber.value) {
        roomToGuestMessage = 'Выберите кол-во гостей не больше ' + roomsNumber.value;
      } else {
        if (guestsNumber.value === '0') {
          roomToGuestMessage = 'Выберите 100 комнат для нежилого съема';
        }
      }
    } else {
      if (guestsNumber.value !== '0') {
        roomToGuestMessage = 'Выберите "не для гостей"';
      }
    }
    guestsNumber.setCustomValidity(roomToGuestMessage);
  };

  btnSubmitForm.addEventListener('click', syncRoomsGuests);
  roomsNumber.addEventListener('change', syncRoomsGuests);
  guestsNumber.addEventListener('change', syncRoomsGuests);

})();
