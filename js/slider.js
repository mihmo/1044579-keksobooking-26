const sliderElement = document.querySelector('.ad-form__slider');
const newAdvertForm = document.querySelector('.ad-form');
const newAdvertPrice = newAdvertForm.querySelector('[name="price"]');

newAdvertPrice.value = 5000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//устанавливаем положение слайдера в соответствии со значением поля
newAdvertPrice.addEventListener('change', () => {
  sliderElement.noUiSlider.set(newAdvertPrice.value);
});

// eslint-disable-next-line no-unused-vars
sliderElement.noUiSlider.on('update', (...rest) => {
  newAdvertPrice.value = sliderElement.noUiSlider.get();
});

// sliderElement.noUiSlider.destroy();
