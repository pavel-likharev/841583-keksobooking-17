'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var card = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (dataElement) {
    var cardElement = card.cloneNode(true);
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

    cardPhotos.removeChild(cardPhoto);
    var createCopyCardPhoto = function () {
      var copyCard = cardPhoto.cloneNode(true);
      return copyCard;
    };

    var translateNameType = function (type) {
      var translatedType;
      if (type === 'bungalo') {
        translatedType = 'Бунгало';
      } else if (type === 'palace') {
        translatedType = 'Дворец';
      } else if (type === 'flat') {
        translatedType = 'Квартира';
      } else if (type === 'house') {
        translatedType = 'Дом';
      }
      return translatedType;
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

  window.card.render = function (listCards) {
    var fragment = document.createDocumentFragment();
    var generatedCard = renderCard(listCards);
    generatedCard.classList.add('visible__card');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        map.removeChild(generatedCard);
      }
    });
    mapFilters.addEventListener('change', window.removeCard);
    var close = generatedCard.querySelector('.popup__close');
    close.addEventListener('click', function () {
      map.removeChild(generatedCard);
    });
    fragment.appendChild(generatedCard);
    map.appendChild(fragment);
  };

})();
