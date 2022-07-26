const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.ok ? response : onFail('Не удалось получить данные. Пожалуйста попробуйте позже.'))
    .then((response) => response.json())
    .then((adverts) => onSuccess(adverts))
    .catch(() => {
      onFail('Не удалось получить данные. Пожалуйста попробуйте позже.');
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
    .then((response) => response.ok ? onSuccess() : onFail('Не удалось отправить данные. Пожалуйста попробуйте позже.'))
    .catch(() => {
      onFail('Не удалось отправить данные. Пожалуйста попробуйте позже.');
    });
};

export { getData, sendData };
