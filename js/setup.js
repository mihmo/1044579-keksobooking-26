export const FLOAT_NUMBERS = 5;
export const TOTAL_ADVERTS = 10;
export const MAX_PRICE = 1000;
export const MAX_ROOMS = 10;
export const ROOMS_TO_GUESTS_RATIO = 2;
export const MIN_LAT = 35.65;
export const MAX_LAT = 35.7;
export const MIN_LNG = 139.7;
export const MAX_LNG = 139.8;
export const MSG_TIMEOUT = 2500;
export const START_LAT = 35.6800;
export const START_LNG = 139.75;
export const DEFAULT_PRICE = 5000;
export const LOW_PRICE = 10000;
export const HIGH_PRICE = 50000;
export const RENDER_DELAY = 700;

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

export {PROPERTY_TYPE_DICTIONARY, PROPERTY_TYPE_PRICE};
