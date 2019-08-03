'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.popup = {
    error: function () {
      var templatError = document.querySelector('#error').content.querySelector('.error');
      var mainPage = document.querySelector('main');
      var errorElement = templatError.cloneNode(true);
      var btnCancelError = errorElement.querySelector('.error__button');
      btnCancelError.addEventListener('click', function () {
        errorElement.classList.add('hidden');
      });
      document.addEventListener('click', function () {
        errorElement.classList.add('hidden');
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          errorElement.classList.add('hidden');
        }
      });
      var fragment = document.createDocumentFragment();
      fragment.appendChild(errorElement);
      mainPage.appendChild(fragment);
    }
  };

})();
