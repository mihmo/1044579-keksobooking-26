// console.log('api.js');

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess(); // showSuccessMessage();
      } else {
        onFail(); // showErrorMessage();
      }
    })
    .catch(() => {
      onFail(); // showErrorMessage();
    });
};

export { getData, sendData };
