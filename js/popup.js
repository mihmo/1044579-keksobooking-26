import { similarAdverts } from './data.js';
import { PROPERTY_TYPE_DICTIONARY } from './data.js';
import { declOfNumbers } from './util.js';

//const kuda = true;
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const advertsList = similarAdverts();

let adverticed = false;

advertsList.forEach((advert) => {
  const advertElement = advertTemplate.cloneNode(true);
  const roomNumberDictionary = declOfNumbers(advert.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestNumberDictionary = declOfNumbers(advert.offer.guests, ['гостя', 'гостей', 'гостей']);
  const featuresContainer = advertElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const advertPhotoContainer = advertElement.querySelector('.popup__photos');
  const advertPhotosFragment = document.createDocumentFragment();
  const advertPhoto = advertPhotoContainer.querySelector('.popup__photo');

  advertElement.querySelector('.popup__title').textContent = advert.offer.title; // Выведите заголовок объявления offer.title в заголовок .
  advertElement.querySelector('.popup__text--address').textContent = advert.offer.address; // Выведите адрес offer.address в блок .popup__text--address.
  advertElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`; // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  advertElement.querySelector('.popup__type').textContent = PROPERTY_TYPE_DICTIONARY[advert.offer.type]; // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
  advertElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} ${roomNumberDictionary} для ${advert.offer.guests} ${guestNumberDictionary}`; // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`; // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  advertElement.querySelector('.popup__avatar').src = advert.author.avatar; // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.

  // Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  if (advert.offer.photos.length) {
    advert.offer.photos.forEach((photo) => { // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
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

  // Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  if (advert.offer.description.length) {
    advertElement.querySelector('.popup__description').textContent = advert.offer.description; // В блок .popup__description выведите описание объекта недвижимости offer.description.
  } else {
    advertElement.querySelector('.popup__description').classList.add('visually-hidden');
  }

  // Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
  if (!adverticed) {
    mapCanvas.appendChild(advertElement);
    adverticed = true;
  }
});
