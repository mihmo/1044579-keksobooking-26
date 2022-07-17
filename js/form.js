import { PROPERTY_TYPE_PRICE } from './data.js';

const newAdvertForm = document.querySelector('.ad-form');
const newAdvertPrice = newAdvertForm.querySelector('[name="price"]');
const newAdvertType = newAdvertForm.querySelector('[name="type"]');
const newAdvertTimein = newAdvertForm.querySelector('[name="timein"]');
const newAdvertTimeout = newAdvertForm.querySelector('[name="timeout"]');
const newAdvertRooms = newAdvertForm.querySelector('[name="rooms"]');
const newAdvertCapacity = newAdvertForm.querySelector('[name="capacity"]');

// Поля «Время заезда» и «Время выезда» синхронизированы
newAdvertTimein.addEventListener('change', () => {
  newAdvertTimeout.value = newAdvertTimein.value;
});
newAdvertTimeout.addEventListener('change', () => {
  newAdvertTimein.value = newAdvertTimeout.value;
});

const pristine = new Pristine(newAdvertForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
pristine.addValidator(newAdvertCapacity, () => {
  if ((newAdvertCapacity.value <= newAdvertRooms.value)||
  (newAdvertRooms.value === 100 && newAdvertCapacity.value === 0)) {
    return true;
  }
  return false;
}, 'Количество гостей не соответствует количеству комнат', 2, false);

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
newAdvertType.addEventListener('change', () => {
  newAdvertPrice.placeholder = PROPERTY_TYPE_PRICE[newAdvertType.value];
  // newAdvertPrice.min = PROPERTY_TYPE_PRICE[newAdvertType.value];
});
pristine.addValidator(newAdvertPrice, () => {
  if (newAdvertPrice.value >= PROPERTY_TYPE_PRICE[newAdvertType.value]){
    return true;
  }
  return false;
}, 'Указана слишком низкая цена', 2, false);

newAdvertForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {evt.preventDefault();}
});
