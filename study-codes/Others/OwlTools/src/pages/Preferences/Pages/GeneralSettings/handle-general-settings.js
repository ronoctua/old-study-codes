import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateGeneralSettings from '../../../../storage/services/CreateGeneralSettings.js';

const logoInThePopupDescriptionBoxOnOff = document.querySelector(
  '#logo-in-the-popup-description-box-on-off',
);

const saveDataButton = document.querySelector('#save-data-button');

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    logoInThePopupDescriptionBoxOnOff.checked =
      data.owlTools.generalSettings.logo.displayInThePopupDescription;
  });
});

const handleSaveNewData = () => {
  CreateGeneralSettings(
    'auto',
    'dark',
    'light',
    'alt',
    'x',
    'x',
    'owl-default',
    logoInThePopupDescriptionBoxOnOff.checked,
  );
};

saveDataButton.addEventListener('click', handleSaveNewData);
