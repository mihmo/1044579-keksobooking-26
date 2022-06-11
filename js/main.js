const TITLES = [
  'Апартаменты-студио Лофт на 23 этаже',
  'Люкс-апартаменты с видом на море',
  'Квартира с авторским ремонтом в центре',
  'Дизайнерские апартаменты',
  'VIP-студио',
  'Уютная квартира'
];
const PROPERTY_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Квартира расположена в новом престижном комплексе Вторая жемчужина. Дизайн и интерьер, выполненный в средиземноморском стиле.',
  'Квартира в элитном новострое, в самом центре города. 200 м от железнодорожного вокзала.',
  'В квартире очень чисто - после каждого гостя производится качественная уборка.',
  'Современные апартаменты находятся в непосредственной близости от чарующих пляжей. Апартаменты расположены в престижном жилом комплексе.'
];
const PHOTO_ULRS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const FLOAT_NUMBERS = 5;
const TOTAL_ADVERTS = 10;
const TOTAL_AVATAR_URLS = 10;
const MAX_PRICE = 1000;
const MAX_ROOMS = 10;
const ROOMS_TO_GUESTS_RATIO = 2;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;

// функцтя генерирует массив url аватаров
const createAvatarUrl = () => {
  const avatarUlrs = [];
  for(let i = 1; i <= TOTAL_AVATAR_URLS; i++){
    avatarUlrs.push(`img/avatars/user${String(i).padStart(2,'0')}.png`);
  }
  return avatarUlrs;
};

// функция генерирует массив ссылок фотографий
const createPhotoUrls = () => {
  const photoUrl = [];
  for (let i = 0; i < PHOTO_ULRS.length; i++) {
    if (Math.round(Math.random())) {
      photoUrl.push(PHOTO_ULRS[i]);
    }
  }
  return photoUrl;
};

// функция создает массив фич в квартире
const createFeatures = () => {
  const featuresList = [];
  for (let i = 0; i < FEATURES.length; i++) {
    if (Math.round(Math.random())) {
      featuresList.push(FEATURES[i]);
    }
  }
  return featuresList;
};

// функция проверяет, что введенные данные >= 0
const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0));

// функцию скопировал отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));

  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

const getRandomFloatInclusive = (min, max, decimal = FLOAT_NUMBERS) => checkNumbers(min, max) ? (Math.random() * (max - min) + min).toFixed(decimal) : 'Указаны не верные параметры'; // Максимум и минимум включаются

// создаем обьект
const createAdvert = () => {
  const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];
  const randomRoomsNumber = getRandomIntInclusive(1, MAX_ROOMS);
  const randomGuestsNumber = getRandomIntInclusive(1, randomRoomsNumber*ROOMS_TO_GUESTS_RATIO);
  const randomLat = getRandomFloatInclusive(MIN_LAT, MAX_LAT);
  const randomLng = getRandomFloatInclusive(MIN_LNG, MAX_LNG);
  return {
    author: {avatar: getRandomArrayElement(createAvatarUrl())}, // строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
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
      lng: randomLng  // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    }
  };
};

const similarAdverts = Array.from({length: TOTAL_ADVERTS}, createAdvert);
similarAdverts();
