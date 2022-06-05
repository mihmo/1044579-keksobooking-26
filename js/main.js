const MIN_VALUE = 1;
const MAX_VALUE = 10;
const TOTAL_NUMBERS = 10;
const FLOAT_NUMBERS = 2;

const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0 && min <= max));

// функцию скопировал отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

const getRandomFloatInclusive = (min, max, decimal) => checkNumbers(min, max) ? (Math.random() * (max - min) + min).toFixed(decimal) : 'Указаны не верные параметры'; // Максимум и минимум включаются

// Проверка выполнения
const resultsArray = [];
for (let i = 0; i < TOTAL_NUMBERS; i++) {
  resultsArray.push(getRandomFloatInclusive(MIN_VALUE, MAX_VALUE, FLOAT_NUMBERS));
  resultsArray.push(getRandomIntInclusive(MIN_VALUE, MAX_VALUE));
}

// console.log(checkNumbers(MIN_VALUE, MAX_VALUE));
// console.log(resultsArray);
