import { toggleEnabled } from './toggle.js';
import { getData } from './api.js';
import { createCustomAdvert } from './popup.js';
import { START_LAT, START_LNG, TOTAL_ADVERTS } from './setup.js';
import { showErrorMessage } from './messages.js';

// отключаю возможность менять значение адреса вручную
const newAdvertForm = document.querySelector('.ad-form');
const newAdvertAddress = newAdvertForm.querySelector('[name="address"]');
newAdvertAddress.style.cssText = 'pointer-events: none; opacity: 0.5';

// настройки карты
const map = L.map('map-canvas')
  .on('load', () => {
    // включаем интерфейс после загрузки карты
    toggleEnabled();
    getData((adverts) => {
      const advertsList = adverts.slice(0, TOTAL_ADVERTS);
      getAdvertsPoints(advertsList);
    }, showErrorMessage);
  })
  .setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// настройки главного пина
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

newAdvertAddress.value = `${START_LAT.toFixed(5)}, ${START_LNG.toFixed(5)}`;
mainPinMarker.on('moveend', (evt) => {
  newAdvertAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

// настройки остальных пинов
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// функция создает маркеры на карте
let advertsLayer = L.layerGroup().addTo(map);
const clearLayer = () => {
  map.removeLayer(advertsLayer);
  advertsLayer = L.layerGroup().addTo(map);
};

// создаем пины с балунами
let advertsFragment;
const createMarker = (advert, index) => {
  const {location: {lat, lng}} = advert;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(advertsLayer)
    .bindPopup(createCustomAdvert(advertsFragment[index]));
};

// функция отрисовывает пины
function getAdvertsPoints(adverts) {
  advertsFragment = adverts;

  clearLayer();
  adverts.forEach((advert, index) => {
    createMarker(advert, index);
  });
}

const resetMap = () => {
  mainPinMarker.setLatLng([START_LAT, START_LNG]).update();
  map.setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 13);
  newAdvertAddress.value = `${START_LAT.toFixed(5)}, ${START_LNG.toFixed(5)}`;
};

export { getAdvertsPoints, resetMap };
