'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

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

  mainPin.addEventListener('mousedown', function () {
    getDisabledFieldsets(false);
  });
})();
