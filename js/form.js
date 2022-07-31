import { PROPERTY_TYPE_PRICE } from './setup.js';
import { DEFAULT_PRICE } from './setup.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const newAdvertForm = document.querySelector('.ad-form');
const newAdvertPrice = newAdvertForm.querySelector('[name="price"]');
const newAdvertType = newAdvertForm.querySelector('[name="type"]');
const newAdvertTimein = newAdvertForm.querySelector('[name="timein"]');
const newAdvertTimeout = newAdvertForm.querySelector('[name="timeout"]');
const newAdvertRooms = newAdvertForm.querySelector('[name="rooms"]');
const newAdvertCapacity = newAdvertForm.querySelector('[name="capacity"]');
const submitButton = newAdvertForm.querySelector('.ad-form__submit');

// Поля «Время заезда» и «Время выезда»  синхронизированы
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
});
pristine.addValidator(newAdvertPrice, () => {
  if (newAdvertPrice.value >= PROPERTY_TYPE_PRICE[newAdvertType.value]){
    return true;
  }
  return false;
}, 'Указана слишком низкая цена', 2, false);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  newAdvertPrice.value = DEFAULT_PRICE;
};

// выполняем проверки перед отправкой
newAdvertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessMessage();
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
    newAdvertForm.reset();
  }
});

export { resetForm };
