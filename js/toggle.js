const adForm = document.querySelector('.ad-form');
const adFormFieldSets = document.querySelectorAll('form.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');
const sliderElement = document.querySelector('.ad-form__slider');


const toggleEnabled = () => {
  adForm.classList.remove('ad-form--disabled');
  sliderElement.removeAttribute('disabled');
  adFormFieldSets.forEach((field) => {
    field.classList.remove('ad-form--disabled');

  });
  mapFilters.classList.remove('map__filters--disabled');
};
const toggleDisable = () => {
  adForm.classList.add('ad-form--disabled');
  sliderElement.setAttribute('disabled', true);
  adFormFieldSets.forEach((field) => {
    field.classList.add('ad-form--disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
};

toggleDisable();

export { toggleEnabled, toggleDisable };
