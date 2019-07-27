'use strict';

(function () {

  var map = document.querySelector('.map');
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

    cardAvatar.src = dataElement.author.avatar;
    cardAvatar.alt = 'Аватар автора';
    cardTitle.innerText = dataElement.offer.title;
    cardAddress.innerText = dataElement.offer.address;
    cardPrice.innerText = dataElement.offer.price + '₽/ночь';
    cardType.innerText = dataElement.offer.type;
    cardCapacity.innerText = dataElement.offer.rooms + ' комнаты для ' + dataElement.offer.guests + ' гостей.';
    cardTime.innerText = 'Заезд после ' + dataElement.offer.checkin + ', выезд до ' + dataElement.offer.checkout;
    cardDescription.innerText = dataElement.offer.description;

    cardFeaturesList.forEach(function (cardFeature) {
      var searchedFeature;
      var nameFeature = cardFeature.className;
      dataElement.offer.features.forEach(function (feature) {
        if (nameFeature.indexOf(feature) >= 0) {
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

  window.card.render = function (listCards, numberOfAuthor) {
    var fragment = document.createDocumentFragment();
    var number = numberOfAuthor;
    var generatedCard = renderCard(listCards[number]);
    fragment.appendChild(generatedCard);
    map.appendChild(fragment);
  };

})();
