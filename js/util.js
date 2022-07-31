import { FLOAT_NUMBERS } from './setup.js';

// функция проверяет, что введенные данные >= 0
const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0));

// функцию скопировал: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));

  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

const getRandomFloatInclusive = (min, max, decimal = FLOAT_NUMBERS) => checkNumbers(min, max) ? (Math.random() * (max - min) + min).toFixed(decimal) : 'Указаны не верные параметры'; // Максимум и минимум включаются

// функция склоняет числовые значения, взял тут https://realadmin.ru/coding/sklonenie-na-javascript.html
const declOfNumbers = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => (evt.keyCode === 27);

export { getRandomIntInclusive, getRandomFloatInclusive, declOfNumbers, debounce, isEscapeKey };
