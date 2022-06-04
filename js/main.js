// функцию скопировал отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return checkNumbers(min, max) ? Math.floor(Math.random() * (max - min + 1)) + min : 'Указаны не верные параметры'; // Максимум и минимум включаются
}

function getRandomFloatInclusive(min, max, decimal) {
  return checkNumbers(min, max) ? (Math.random() * (max - min) + min).toFixed(decimal) : 'Указаны не верные параметры'; // Максимум и минимум включаются
}

function checkNumbers(min, max) {
  return (min >= 0 && max >= 0 && min <= max) ? true : false;
  // Линтер ругается: Unnecessary use of boolean literals in conditional expression.
  // Предлагает заменить на return !!((min >= 0 && max >= 0 && min <= max))
}

// Проверка выполнения

let resultsArray = [];
// линтер ругается: 'resultsArray' is never reassigned. Use 'const' instead.
// почему так происходит, ведь я использую его в цикле и передаю его далее в alert?

for (let i = 0; i < 10; i++) {
  resultsArray.push(getRandomFloatInclusive(1, 10, 3));
  // resultsArray.push(getRandomIntInclusive(1, 10));
}

alert(resultsArray);


