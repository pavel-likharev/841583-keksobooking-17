'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhotos = document.querySelector('.ad-form__input');
  var photosAdForm = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileChooserPhotos.addEventListener('change', function () {
    var file = fileChooserPhotos.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photosAdForm.classList.remove('hidden');
        var copyForm = photosAdForm.cloneNode();
        photosAdForm.classList.add('hidden');
        copyForm.classList.add('upload__photo');
        var image = document.createElement('img');
        image.src = reader.result;
        image.width = 70;
        image.heigth = 70;
        copyForm.appendChild(image);
        var fragment = document.createDocumentFragment();
        fragment.appendChild(copyForm);
        photosContainer.appendChild(fragment);
      });

      reader.readAsDataURL(file);
    }
  });

})();
