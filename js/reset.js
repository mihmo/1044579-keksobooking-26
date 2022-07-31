import { resetFilter } from './filter.js';
import { resetForm } from './form.js';
import { resetMap } from './map.js';
import { resetSlider } from './slider.js';

const newAdvertForm = document.querySelector('.ad-form');
const avatarPreview = newAdvertForm.querySelector('.ad-form-header__preview img');
const adPhotoPreview = newAdvertForm.querySelector('.ad-form__photo');
const filtersForm = document.querySelector('.map__filters');

newAdvertForm.addEventListener('reset', ()=> {
  avatarPreview.src = 'img/muffin-grey.svg';
  adPhotoPreview.innerHTML = '';
  filtersForm.reset();
  resetSlider();
  setTimeout(() => {
    resetMap();
    resetFilter();
    resetForm();
  });
});
