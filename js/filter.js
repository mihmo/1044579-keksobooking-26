import { getData } from './api.js';
import { getAdvertsPoints } from './map.js';
import { showErrorMessage } from './messages.js';
import { HIGH_PRICE, LOW_PRICE, RENDER_DELAY, TOTAL_ADVERTS } from './setup.js';
import { debounce } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeField = mapFiltersForm.querySelector('#housing-type');
const housingRoomsField = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsField = mapFiltersForm.querySelector('#housing-guests');
const housingPriceField = mapFiltersForm.querySelector('#housing-price');
const housingFeaturesField = mapFiltersForm.querySelector('#housing-features');

const filterAdType = (adverts) => housingTypeField.value !== 'any' ? adverts.offer.type === housingTypeField.value : true;
const filterAdRooms = (adverts) => housingRoomsField.value !== 'any' ? adverts.offer.rooms === +housingRoomsField.value : true;
const filterAdGuests = (adverts) => housingGuestsField.value !== 'any' ? adverts.offer.guests === +housingGuestsField.value : true;

const filterAdPrice = (adverts) => {
  const adPrice = () => {
    if (adverts.offer.price < LOW_PRICE) {
      return 'low';
    } else {
      if (adverts.offer.price > HIGH_PRICE) {
        return 'high';
      } else {
        return 'middle';
      }
    }
  };
  return housingPriceField.value !== 'any' ? adPrice() === housingPriceField.value : true;
};

const filterAdFeatures = (adverts) => {
  const selectedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let check = false;
  if (selectedFeatures.length > 0) {
    if (adverts.offer.features) {
      for (let i = 0; i < adverts.offer.features.length; i++) {
        if (selectedFeatures.some((checkedFeature) => checkedFeature === adverts.offer.features[i])) {
          check = true;
        }
      }
    }
  } else {
    check = true;
  }
  return check;
};

const getAdFeaturesRank = (adverts) => {
  const selectedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let rank = 0;
  if (adverts.offer.features) {
    adverts.offer.features.forEach((feature) => {
      if (selectedFeatures.some((checkedFeature) => checkedFeature === feature)) {
        rank++;
      }
    });
  }
  return rank;
};

const compareAdsFeatures = (adA, adB) =>{
  const rankA = getAdFeaturesRank(adA);
  const rankB = getAdFeaturesRank(adB);

  return rankB - rankA;
};

const resetFilter = () =>{
  getData((adverts) => {
    const advertsList = adverts
      .filter(filterAdType)
      .filter(filterAdRooms)
      .filter(filterAdGuests)
      .filter(filterAdPrice)
      .filter(filterAdFeatures)
      .sort(compareAdsFeatures)
      .slice(0, TOTAL_ADVERTS);
    getAdvertsPoints(advertsList);
  }, showErrorMessage);
};

mapFiltersForm.addEventListener('change', debounce(resetFilter, RENDER_DELAY));

export { resetFilter };
