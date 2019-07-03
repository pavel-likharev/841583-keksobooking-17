'use strict';

(function () {
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var price = document.querySelector('#price');
  var selectTypesHouse = document.querySelector('#type');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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

})();
