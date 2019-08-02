'use strict';

(function () {

  var AMOUNT_OFFERS = 5;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var listPins = document.querySelector('.map__pins');
  var btnSubmit = document.querySelector('.ad-form__submit');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var error = document.querySelector('#error').content.querySelector('.error');
  var mainPage = document.querySelector('main');
  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  var filterPrice = mapFilters.querySelector('#housing-price');
  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var filterGuests = mapFilters.querySelector('#housing-guests');
  // var filterFeatures = mapFilters.querySelectorAll('.map__checkbox');

  var offers = [];


  // Задаём функцию создания шаблона одного маркера
  var renderPin = function (offer) {
    var pinElement = pin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.type;
    pinElement.classList.add('render__pin');
    pinElement.addEventListener('click', function () {

      var card = map.querySelector('article');
      if (card !== null) { // условие, если карточка отрисована - не вызывать рендер, а если нет - вызывать
        return;
      } else {
        window.card.render(offer);

      }
    });
    return pinElement;
  };

  // Задаём функцию создания списка предложений
  var renderMap = function (listOffers) {
    window.removeOffers();

    var fragment = document.createDocumentFragment();
    var takeNumber = listOffers.length > AMOUNT_OFFERS ? AMOUNT_OFFERS : listOffers.length;
    for (var i = 0; i < takeNumber; i++) {
      var generatedPin = renderPin(listOffers[i]);
      fragment.appendChild(generatedPin);
    }
    listPins.appendChild(fragment);
  };

  // Задаём функцию удаления списка пинов перед сортировкой
  window.removeOffers = function () {
    var renderPins = listPins.querySelectorAll('.render__pin');
    for (var i = 0; i < renderPins.length; i++) {
      listPins.removeChild(renderPins[i]);
    }
  };

  window.removeCard = function () {
    var visibleCard = map.querySelector('.visible__card');
    if (visibleCard !== null) {
      map.removeChild(visibleCard);
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
    btnSubmit.disabled = false;
    renderMap(offers);
    // onPinCallCards();
    mainPin.removeEventListener('mouseup', callRender);
  };

  window.pinHadler = function () {
    mainPin.addEventListener('mouseup', callRender);
  };
  window.pinHadler();
  // Функция сортировки данных по фильтрам

  var searchSelectedOption = function (kindOfFilter) {
    for (var i = 0; i < kindOfFilter.length; i++) {
      if (kindOfFilter[i].selected) {
        var selectedOption = kindOfFilter[i].value;
      }
    }
    return selectedOption;
  };

  // var searchCheckedCheckbox = function (kindOfFilter) {
  //   var checkedCheckboxes = [];
  //   for (var i = 0; i < kindOfFilter.length; i++) {
  //     if (kindOfFilter[i].checked) {
  //       checkedCheckboxes.push(kindOfFilter[i].value);
  //     }
  //   }
  //   return checkedCheckboxes;
  // };

  var sortingByFilter = function () {
    if (
      searchSelectedOption(filterType) === 'any' &&
      searchSelectedOption(filterPrice) === 'any' &&
      searchSelectedOption(filterRooms) === 'any' &&
      searchSelectedOption(filterGuests) === 'any') {
      return offers;
    } else {
      var newOffers = offers
      .slice()
      .filter(function (pinOffer) {
        var sortingOffers;
        if (searchSelectedOption(filterType) === 'any') {
          sortingOffers = pinOffer;
        } else {
          sortingOffers = pinOffer.offer.type === searchSelectedOption(filterType);
        }
        return sortingOffers;
      })
      .filter(function (pinOffer) {
        var sortingOffers;
        if (searchSelectedOption(filterRooms) === 'any') {
          sortingOffers = pinOffer;
        } else {
          sortingOffers = String(pinOffer.offer.rooms) === searchSelectedOption(filterRooms);

        }
        return sortingOffers;
      })
      .filter(function (pinOffer) {
        var sortingOffers;
        if (searchSelectedOption(filterGuests) === 'any') {
          sortingOffers = pinOffer;
        } else {
          sortingOffers = String(pinOffer.offer.guests) === searchSelectedOption(filterGuests);
        }
        return sortingOffers;
      })
      .filter(function (pinOffer) {
        var PriceList = {
          'middle': pinOffer.offer.price >= '10000' && pinOffer.offer.price <= '50000',
          'low': pinOffer.offer.price < '10000',
          'high': pinOffer.offer.price > '50000'
        };
        var sortingOffers;
        if (searchSelectedOption(filterPrice) === 'any') {
          sortingOffers = pinOffer;
        } else if (searchSelectedOption(filterPrice) === 'middle') {
          sortingOffers = PriceList.middle;
        } else if (searchSelectedOption(filterPrice) === 'low') {
          sortingOffers = PriceList.low;
        } else if (searchSelectedOption(filterPrice) === 'high') {
          sortingOffers = PriceList.high;
        }
        return sortingOffers;
      })
      // .filter(function (pinOffer) {
      //   if (searchCheckedCheckbox(filterFeatures).length === 0) {
      //     return pinOffer.offer.features;
      //   } else {
      //     var checkboxes = [];
      //     for (var i = 0; i < searchCheckedCheckbox(filterFeatures).length; i++) {
      //       checkboxes.push(searchCheckedCheckbox(filterFeatures)[i]);
      //     }
      //     for (var k = 0; k < checkboxes.length; k++) {
      //       return pinOffer.offer.features.indexOf(checkboxes[k]) !== -1; // найти способ вместо цикла сравнить два массива и вывести return, т.к. он останавливает цикл
      //     }
      //   }
      // })
      // Код вызвращает фильтрацию только по одному чекбоксу из массива чекбоксов
      ;
      return newOffers;
    }
  };

  var lastTimeout;
  mapFilters.addEventListener('change', function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderMap(sortingByFilter());
    }, 500);
  });

  // listPins.addEventListener('click', function (event) {
  //   var target = event.target;
  //   if (target.className === 'map__pin') {
  //     alert('zzz');
  //   }
  // .....
  // for (var i = 0; i < searchCheckedCheckbox(filterFeatures).length; i++) {
  //   return pinOffer.offer.features.indexOf(searchCheckedCheckbox(filterFeatures)[i]) !== -1;
  // }

  // черновик на время

})();
