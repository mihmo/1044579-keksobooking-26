
import { PROPERTY_TYPE_DICTIONARY } from './data.js';
import { declOfNumbers } from './util.js';

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkContent = (element, data) => {
  if (data.length > 0) {
    element.textContent = data;
  } else {
    element.classList.add('visually-hidden');
  }
};

const createCustomAdvert = (advert) => {
  const advertElement = advertTemplate.cloneNode(true);
  const roomNumberDictionary = declOfNumbers(advert.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestNumberDictionary = declOfNumbers(advert.offer.guests, ['гостя', 'гостей', 'гостей']);
  const featuresContainer = advertElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const advertPhotoContainer = advertElement.querySelector('.popup__photos');
  const advertPhotosFragment = document.createDocumentFragment();
  const advertPhoto = advertPhotoContainer.querySelector('.popup__photo');

  // Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  // Выведите заголовок объявления offer.title в заголовок.
  checkContent(advertElement.querySelector('.popup__title'), advert.offer.title);

  // Выведите адрес offer.address в блок .popup__text--address.
  checkContent(advertElement.querySelector('.popup__text--address'), advert.offer.address);

  // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  if (advert.offer.price && isFinite(+advert.offer.price)) {
    advertElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
  } else {
    advertElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  }

  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
  if (advert.offer.type) {
    advertElement.querySelector('.popup__type').textContent = PROPERTY_TYPE_DICTIONARY[advert.offer.type];
  } else {
    advertElement.querySelector('.popup__type').classList.add('visually-hidden');
  }

  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  if (advert.offer.rooms && advert.offer.guests) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} ${roomNumberDictionary} для ${advert.offer.guests} ${guestNumberDictionary}`;
  } else {
    advertElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }

  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  if (advert.offer.checkin && advert.offer.checkout) {
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  } else {
    advertElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  }

  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  if (advert.author.avatar) {
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  } else {
    advertElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  if (advert.offer.photos.length) {
    advert.offer.photos.forEach((photo) => {
      const advertNewPhoto = advertPhoto.cloneNode(true);
      advertNewPhoto.src = photo;
      advertPhotosFragment.append(advertNewPhoto);
    });
    advertPhotoContainer.innerHTML = '';
    advertPhotoContainer.append(advertPhotosFragment);
  } else {
    advertPhotoContainer.classList.add('visually-hidden');
  }

  // В список .popup__features выведите все доступные удобства в объявлении.
  featuresList.forEach((featuresListItem) => {
    const isNecessary =  advert.offer.features.some(
      (propertyFeature) => featuresListItem.classList.contains(`popup__feature--${  propertyFeature}`),
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  // В блок .popup__description выведите описание объекта недвижимости offer.description.
  if (advert.offer.description.length) {
    advertElement.querySelector('.popup__description').textContent = advert.offer.description;
  } else {
    advertElement.querySelector('.popup__description').classList.add('visually-hidden');
  }

  // Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
  // if (!adverticed) {
  //   mapCanvas.appendChild(advertElement);
  //   adverticed = true;
  // }

  return advertElement;
};

export {createCustomAdvert};
