const mapCanvas = document.querySelector('.map__canvas');
const adForm = document.querySelector('.ad-form');
const adFormFieldSets = document.querySelectorAll('form.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');


const toggleEnabled = () => {
  mapCanvas.style.cssText = 'pointer-events: auto; opacity: 1';
  adForm.classList.remove('ad-form--disabled');
  adFormFieldSets.forEach((field) => {
    field.classList.remove('ad-form--disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
};
const toggleDisable = () => {
  mapCanvas.style.cssText = 'pointer-events: none; opacity: 0.5';
  adForm.classList.add('ad-form--disabled');
  adFormFieldSets.forEach((field) => {
    field.classList.add('ad-form--disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
};

export {toggleEnabled};
export {toggleDisable};
