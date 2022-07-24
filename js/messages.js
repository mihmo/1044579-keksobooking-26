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
  setTimeout(() => {
    successMessage.remove();
  }, 2500);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
