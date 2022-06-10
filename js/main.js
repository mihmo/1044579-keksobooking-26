const MIN_VALUE = 1;
const MAX_VALUE = 5;
const TOTAL_NUMBERS = 10;
const FLOAT_NUMBERS = 2;

//функция проверяет что введенные данные >= 0
const checkNumbers = (min, max)  => !!((min >= 0 && max >= 0));

// функцию скопировал отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));

  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
};

const getRandomFloatInclusive = (min, max, decimal = 1) => checkNumbers(min, max) ? (Math.random() * (max - min) + min).toFixed(decimal) : 'Указаны не верные параметры'; // Максимум и минимум включаются

// Проверка выполнения
const resultsArray = [];
for (let i = 0; i < TOTAL_NUMBERS; i++) {
  resultsArray.push(getRandomFloatInclusive(MIN_VALUE, MAX_VALUE, FLOAT_NUMBERS));
  resultsArray.push(getRandomIntInclusive(MIN_VALUE, MAX_VALUE));
}

// console.log(checkNumbers(MIN_VALUE, MAX_VALUE));
// console.log(resultsArray);
