'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var listPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainPage = document.querySelector('main');

  var mapFilters = document.querySelector('.map__filters');
  var filterTypes = mapFilters.querySelector('#housing-type');
  var filterTypesList = mapFilters.querySelector('#housing-type').options;

  var offers = [];


  // Задаём функцию создания шаблона одного маркера
  var renderPin = function (offer) {
    var pinElement = pin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.type;
    pinElement.classList.add('render__pin');

    return pinElement;
  };

  // Задаём функцию создания списка предложений
  var render = function (listOffers) {
    removeOffers();
    var takeNumber = listOffers.length > 5 ? 5 : listOffers.length;
    for (var i = 0; i < takeNumber; i++) {
      listPins.appendChild(renderPin(listOffers[i]));
    }
  };

  // Задаём функцию удаления списка пинов перед сортировкой
  var removeOffers = function () {
    var renderPins = listPins.querySelectorAll('.render__pin');
    for (var i = 0; i < renderPins.length; i++) {
      listPins.removeChild(renderPins[i]);
    }
  };

  // Задаём функцию действий при успешной загрузке данных
  var successHandler = function (data) {
    offers = data;
    render(offers);
  };

  // Задаём функцию действий при ошибке загрузки данных
  var errorHandler = function () {
    var errorElement = error.cloneNode(true);
    mainPage.appendChild(errorElement);
  };

  // Обработчик, вызывающий загрузку данных
  var callLoad = function () {
    window.load(successHandler, errorHandler);
    mainPin.removeEventListener('mouseup', callLoad);
  };

  mainPin.addEventListener('mouseup', callLoad);

  // Функция сортировки данных по фильтрам
  var getSelectedOption = function () {
    for (var i = 0; i < filterTypesList.length; i++) {
      if (filterTypesList[i].selected) {
        var checkOption = filterTypesList[i].value;
      }
    }
    return checkOption;
  };

  var sortingByType = function () {
    if (getSelectedOption() === 'any') {
      return offers;
    } else {
      var newOffers = offers
      .slice()
      .filter(function (pinOffer) {
        return pinOffer.offer.type === getSelectedOption();
      });
      return newOffers;
    }
  };

  filterTypes.addEventListener('change', function () {
    render(sortingByType());
  });

})();
