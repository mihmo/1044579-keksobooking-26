import { MSG_TIMEOUT } from './setup.js';
import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

errorButton.addEventListener('click', () => {
  errorMessage.remove();
});

const showSuccessMessage = () => {
  document.body.append(successMessage);
  successMessage.addEventListener('click', () => successMessage.remove());
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
    }
  });
  setTimeout(() => {
    successMessage.remove();
  }, MSG_TIMEOUT);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
