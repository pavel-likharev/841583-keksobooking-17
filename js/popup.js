'use strict';

(function () {
  window.popup = {
    error: function () {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var mainPage = document.querySelector('main');
      var errorElement = templateError.cloneNode(true);
      var btnCancelError = errorElement.querySelector('.error__button');
      btnCancelError.addEventListener('click', function () {
        errorElement.classList.add('hidden');
      });
      document.addEventListener('click', function () {
        errorElement.classList.add('hidden');
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
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
