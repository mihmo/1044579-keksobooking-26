const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {evt.preventDefault();}
});
