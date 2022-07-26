const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const adPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const adPhotoPreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

adPhotoChooser.addEventListener('change', () => {
  const file = adPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const newAdPhoto = document.createElement('img');
    newAdPhoto.height = 70;
    newAdPhoto.src = URL.createObjectURL(file);

    adPhotoPreview.append(newAdPhoto);
  }
});
