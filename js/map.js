'use strict';

(function () {

  var AMOUNT_OFFERS = 5;

  // var map = document.querySelector('.map');
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

  var callRenderCard = function (dataOffers, numberPin) {
    window.card.render(dataOffers, numberPin);
  };

  // Задаём функцию создания списка предложений
  var renderMap = function (listOffers) {
    window.removeOffers();

    var fragment = document.createDocumentFragment();
    var takeNumber = listOffers.length > AMOUNT_OFFERS ? AMOUNT_OFFERS : listOffers.length;
    for (var i = 0; i < takeNumber; i++) {
      var generatedPin = renderPin(listOffers[i]);
      generatedPin.addEventListener('click', function () {
        callRenderCard(offers, 1);
      });
      // вариант с отрисовкой
      fragment.appendChild(generatedPin);
    }

    listPins.appendChild(fragment);
  };

  // var onPinCallCards = function () {
  //   var listOfPins = listPins.querySelectorAll('.render__pin');
  //   listOfPins.forEach(function (onePin) {
  //     onePin.addEventListener('click', function() {
  //       callRenderCard(offers, 0);
  //     })
  //   })
  // };
  // вариант с обработчиками уже после создания, только вместо 0 поставить свой объект


  // Задаём функцию удаления списка пинов перед сортировкой
  window.removeOffers = function () {
    var renderPins = listPins.querySelectorAll('.render__pin');
    for (var i = 0; i < renderPins.length; i++) {
      listPins.removeChild(renderPins[i]);
    }
  };

  // Задаём функцию действий при успешной загрузке данных
  var successHandler = function (data) {
    offers = data;
  };

  // Задаём функцию действий при ошибке загрузки данных
  var errorHandler = function () {
    var errorElement = error.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    mainPage.appendChild(fragment);
  };

  window.load(successHandler, errorHandler);

  // Обработчик, вызывающий загрузку данных
  var callRender = function () {
    renderMap(offers);
    // onPinCallCards();
    mainPin.removeEventListener('mouseup', callRender);
  };

  mainPin.addEventListener('mouseup', callRender);

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
    renderMap(sortingByType());
  });

  // listPins.addEventListener('click', function (event) {
  //   var target = event.target;
  //   if (target.className === 'map__pin') {
  //     alert('zzz');
  //   }

})();
