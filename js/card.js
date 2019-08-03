'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  // Функция запуска создания карточки
  var renderCard = function (dataElement) {
    var cardElement = templateCard.cloneNode(true);
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFeaturesList = cardElement.querySelectorAll('.popup__feature');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardPhoto = cardElement.querySelector('.popup__photo');

    var typeToRusName = {
      'bungalo': 'Бунгало',
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом'
    };

    cardPhotos.removeChild(cardPhoto);
    var createCopyCardPhoto = function () {
      return cardPhoto.cloneNode(true);
    };

    var translateNameType = function (type) {
      return typeToRusName[type];
    };

    cardAvatar.src = dataElement.author.avatar;
    cardAvatar.alt = 'Аватар автора';
    cardTitle.innerText = dataElement.offer.title;
    cardAddress.innerText = dataElement.offer.address;
    cardPrice.innerText = dataElement.offer.price + '₽/ночь';
    cardType.innerText = translateNameType(dataElement.offer.type);
    cardCapacity.innerText = dataElement.offer.rooms + ' комнаты для ' + dataElement.offer.guests + ' гостей.';
    cardTime.innerText = 'Заезд после ' + dataElement.offer.checkin + ', выезд до ' + dataElement.offer.checkout;
    cardDescription.innerText = dataElement.offer.description;

    cardFeaturesList.forEach(function (cardFeature) {
      var searchedFeature;
      var nameFeature = cardFeature.className;
      dataElement.offer.features.forEach(function (feature) {
        if (nameFeature.indexOf(feature) !== -1) {
          searchedFeature = cardFeature;
        }
      });
      if (searchedFeature) {
        return;
      } else {
        cardFeatures.removeChild(cardFeature);
      }
    });

    dataElement.offer.photos.forEach(function (photo) {
      var copyCardPhoto = createCopyCardPhoto();
      copyCardPhoto.src = photo;
      cardPhotos.appendChild(copyCardPhoto);

    });

    cardElement.classList.add('render__card');
    return cardElement;
  };

  // Функция отрисовки карточки на странице
  window.render = function (dataCard) {
    var fragment = document.createDocumentFragment();
    var generatedCard = renderCard(dataCard);
    generatedCard.classList.add('visible__card');

    var close = generatedCard.querySelector('.popup__close');
    close.addEventListener('click', function () {
      map.removeChild(generatedCard);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.preventDefault();
        window.removeCard();
      }
    });

    fragment.appendChild(generatedCard);
    map.appendChild(fragment);

    mapFilters.addEventListener('change', window.removeCard);
  };

})();
