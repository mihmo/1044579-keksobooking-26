import { getRandomFloatInclusive, getRandomIntInclusive } from './util.js';
import { TOTAL_ADVERTS, MAX_ROOMS, ROOMS_TO_GUESTS_RATIO, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG, MAX_PRICE } from './setup.js';

const TITLES = [
  'Апартаменты-студио Лофт на 23 этаже',
  'Люкс-апартаменты с видом на море',
  'Квартира с авторским ремонтом в центре',
  'Дизайнерские апартаменты',
  'VIP-студио',
  'Уютная квартира',
];
const PROPERTY_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PROPERTY_TYPE_DICTIONARY = {
  flat: 'Квартира', // Квартира для flat
  bungalow: 'Бунгало', // Бунгало для bungalow
  house: 'Дом', // Дом для house
  palace: 'Дворец', // Дворец для palace
  hotel: 'Отель' // Отель для hotel
};
const PROPERTY_TYPE_PRICE = {
  bungalow: 0, // минимальная цена за ночь 0
  flat: 1000, // минимальная цена за ночь 1000
  hotel: 3000, // минимальная цена за ночь 3000
  house: 5000, // минимальная цена за ночь 5000
  palace: 10000 // минимальная цена за ночь 10 000
};
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Квартира расположена в новом престижном комплексе Вторая жемчужина. Дизайн и интерьер, выполненный в средиземноморском стиле.',
  'Квартира в элитном новострое, в самом центре города. 200 м от железнодорожного вокзала.',
  'В квартире очень чисто - после каждого гостя производится качественная уборка.',
  'Современные апартаменты находятся в непосредственной близости от чарующих пляжей. Апартаменты расположены в престижном жилом комплексе.',
];
const PHOTO_ULRS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// функция создает ссылку на аватар (используя прерывание)
const createAvatarId = () => {
  let i = 0;
  return function () {
    i++;
    return `img/avatars/user${String(i).padStart(2,'0')}.png`;
  };
};

// функция рандомно генерирует массив ссылок фотографий
const createPhotoUrls = () => {
  const photoUrl = [];
  for (let i = 0; i < PHOTO_ULRS.length; i++) {
    if (Math.round(Math.random())) {
      photoUrl.push(PHOTO_ULRS[i]);
    }
  }
  return photoUrl;
};

// функция создает массив рандомных фич в квартире
const createFeatures = () => {
  const featuresList = [];
  for (let i = 0; i < FEATURES.length; i++) {
    if (Math.round(Math.random())) {
      featuresList.push(FEATURES[i]);
    }
  }
  return featuresList;
};

const avatarId = createAvatarId();

// создаем обьект
const createAdvert = () => {
  const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];
  const randomRoomsNumber = getRandomIntInclusive(1, MAX_ROOMS);
  const randomGuestsNumber = getRandomIntInclusive(1, randomRoomsNumber*ROOMS_TO_GUESTS_RATIO);
  const randomLat = getRandomFloatInclusive(MIN_LAT, MAX_LAT);
  const randomLng = getRandomFloatInclusive(MIN_LNG, MAX_LNG);
  return {
    author: {avatar: avatarId()}, // строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
    offer: {title: getRandomArrayElement(TITLES), // строка — заголовок предложения. Придумайте самостоятельно.
      address: `обьект расположен по координатам: ${randomLat} градус ширины, ${randomLng} градус долготы`, //  строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}
      price: getRandomIntInclusive(0, MAX_PRICE),  // число — стоимость. Случайное целое положительное число.
      type: getRandomArrayElement(PROPERTY_TYPE), // строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel
      rooms: randomRoomsNumber, // число — количество комнат. Случайное целое положительное число.
      guests: randomGuestsNumber, // число — количество гостей, которое можно разместить. Случайное целое положительное число
      checkin: getRandomArrayElement(TIMES), // строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
      checkout: getRandomArrayElement(TIMES), //  строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
      features: createFeatures(), // массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
      description: getRandomArrayElement(DESCRIPTIONS), // строка — описание помещения. Придумайте самостоятельно.
      photos: createPhotoUrls(), //массив строк — массив случайной длины из значений:
    },
    location: {
      lat: randomLat, // число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
      lng: randomLng,  // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    }
  };
};

const similarAdverts = () => Array.from({length: TOTAL_ADVERTS}, createAdvert);
export {similarAdverts};
export {PROPERTY_TYPE_DICTIONARY, PROPERTY_TYPE_PRICE};
