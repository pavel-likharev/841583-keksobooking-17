'use strict';

(function () {
  var URL_OPEN = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;

  window.data = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess(xhr.response);
        } else {
          onError('Статус объекта: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL_OPEN);
      xhr.send();
    },

    send: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess(xhr.response);
        } else {
          onError('Статус объекта: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', URL_SEND);
      xhr.send(data);
    }
  };

})();
