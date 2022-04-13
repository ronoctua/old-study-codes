import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const initialDescription = document.querySelector('#initial-description');

const logoClass = 'own-tools-icon';

const hideDescriptionLogo = () => {
  if (!initialDescription.classList.contains(logoClass)) {
    return;
  }

  initialDescription.classList.remove(logoClass);
};

const displayDescriptionLogo = () => {
  if (initialDescription.classList.contains(logoClass)) {
    return;
  }

  initialDescription.classList.add(logoClass);
};

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    data.owlTools.generalSettings.logo.displayInThePopupDescription === false
      ? hideDescriptionLogo()
      : displayDescriptionLogo();
  });
});
