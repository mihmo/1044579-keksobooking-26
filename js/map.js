import { getData } from './api.js';
import { toggleDisable, toggleEnabled } from './toggle.js';
import { createCustomAdvert } from './popup.js';
// import { similarAdverts } from './data.js';

// console.log('map.js');

const newAdvertForm = document.querySelector('.ad-form');
const newAdvertAddress = newAdvertForm.querySelector('[name="address"]');
newAdvertAddress.style.cssText = 'pointer-events: none; opacity: 0.5';

// const resetButton = document.querySelector('#reset');

// отключаем интерфейс до загрузки
toggleDisable();

// const advertsList = similarAdverts();

// настройки карты
const map = L.map('map-canvas')
  .on('load', () => {
    // включаем интерфейс после загрузки карты
    toggleEnabled();
  })
  .setView({
    lat: 35.6800,
    lng: 139.75,
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
    lat: 35.6800,
    lng: 139.75,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

newAdvertAddress.value = '35.68000, 139.75000';
mainPinMarker.on('moveend', (evt) => {
  newAdvertAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  // newAdvertAddress.value = evt.target.getLatLng();
});

// настройки остальных пинов

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (advert) => {
  // console.log(advert);
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
    .addTo(markerGroup)
    .bindPopup(createCustomAdvert(advert));
};

getData((adverts) => {
  // console.log(adverts.slice(0, 10));
  adverts.slice(0, 10)
    .forEach((advert) => {
      createMarker(advert);
    });
});

// markerGroup.clearLayers();


// markers.forEach((marker) => {
//   marker.remove();
// });

// advertsList.forEach((point) => {
//   createMarker(point);
// });


// ==============================================

// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });

//   map.setView({
//     lat: 59.96831,
//     lng: 30.31748,
//   }, 16);
// });
