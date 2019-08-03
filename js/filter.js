'use strict';

(function () {
  var WITHOUT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var filterHousingType = mapFilters.querySelector('#housing-type');
  var filterPrice = mapFilters.querySelector('#housing-price');
  var filterRooms = mapFilters.querySelector('#housing-rooms');
  var filterGuests = mapFilters.querySelector('#housing-guests');

  var wifi = mapFilters.querySelector('#filter-wifi');
  var dishwasher = mapFilters.querySelector('#filter-dishwasher');
  var parking = mapFilters.querySelector('#filter-parking');
  var washer = mapFilters.querySelector('#filter-washer');
  var elevator = mapFilters.querySelector('#filter-elevator');
  var conditioner = mapFilters.querySelector('#filter-conditioner');

  // Функция сортировки данных по фильтрам
  var searchValueSelectedOption = function (kindOfFilter) {
    for (var i = 0; i < kindOfFilter.length; i++) {
      if (kindOfFilter[i].selected) {
        var selectedOption = kindOfFilter[i].value;
      }
    }
    return selectedOption;
  };

  var checkFilterHousingType = function (oneOffer) {
    if (searchValueSelectedOption(filterHousingType) === WITHOUT_FILTER) {
      return oneOffer;
    } else {
      return oneOffer.offer.type === searchValueSelectedOption(filterHousingType);
    }
  };

  var checkfilterPrice = function (oneOffer) {
    var PriceList = {
      'middle': oneOffer.offer.price >= '10000' && oneOffer.offer.price <= '50000',
      'low': oneOffer.offer.price < '10000',
      'high': oneOffer.offer.price > '50000'
    };

    if (searchValueSelectedOption(filterPrice) === WITHOUT_FILTER) {
      return oneOffer;
    } else if (searchValueSelectedOption(filterPrice) === 'low') {
      return PriceList.low;
    } else if (searchValueSelectedOption(filterPrice) === 'middle') {
      return PriceList.middle;
    } else if (searchValueSelectedOption(filterPrice) === 'high') {
      return PriceList.high;
    } else {
      return true;
    }

  };

  var checkfilterRooms = function (oneOffer) {
    if (searchValueSelectedOption(filterRooms) === WITHOUT_FILTER) {
      return oneOffer;
    } else {
      return String(oneOffer.offer.rooms) === searchValueSelectedOption(filterRooms);
    }
  };

  var checkfilterGuests = function (oneOffer) {
    if (searchValueSelectedOption(filterGuests) === WITHOUT_FILTER) {
      return oneOffer;
    } else {
      return String(oneOffer.offer.guests) === searchValueSelectedOption(filterGuests);
    }
  };

  var checkfilterFeatures = function (input, oneOffer) {
    if (!input.checked) {
      return true;
    }
    return oneOffer.offer.features.indexOf(input.value) !== -1;
  };

  var sortingByFilter = function () {
    var filteredOffers = window.offers
    .slice()
    .filter(function (oneOffer) {
      return checkFilterHousingType(oneOffer) &&
      checkfilterPrice(oneOffer) &&
      checkfilterRooms(oneOffer) &&
      checkfilterGuests(oneOffer) &&
      checkfilterFeatures(wifi, oneOffer) &&
      checkfilterFeatures(dishwasher, oneOffer) &&
      checkfilterFeatures(parking, oneOffer) &&
      checkfilterFeatures(washer, oneOffer) &&
      checkfilterFeatures(elevator, oneOffer) &&
      checkfilterFeatures(conditioner, oneOffer);
    });
    return filteredOffers;
  };

  var renderFilteredOffers = function () {
    window.renderMap(sortingByFilter());
  };

  mapFilters.addEventListener('change', function () {
    window.util.debounce(renderFilteredOffers);
  });

})();
