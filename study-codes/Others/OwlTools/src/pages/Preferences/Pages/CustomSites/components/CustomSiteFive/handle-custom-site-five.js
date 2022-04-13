import CreateOrCheckDefaultData from '../../../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCustomSiteFive from '../../../../../../storage/services/CreateCustomSiteFive.js';

setTimeout(() => {
  const customSiteFiveSaveButton = document.querySelector(
    '#custom-site-five-save-button',
  );
  const customSiteFiveDisplay = true;
  const customSiteFiveWhereToOpen = document.querySelector(
    '#custom-site-five-where-to-open',
  );
  const customSiteFiveIcon = document.querySelector('#custom-site-five-icon');
  const customSiteFiveTitle = document.querySelector('#custom-site-five-title');
  const customSiteFiveProtocol = document.querySelector(
    '#custom-site-five-protocol',
  );
  const customSiteFiveAddress = document.querySelector(
    '#custom-site-five-address',
  );

  CreateOrCheckDefaultData().then(() => {
    const getAndShowData = () => {
      browser.storage.sync.get().then(async (data) => {
        customSiteFiveWhereToOpen.value =
          data.owlTools.customSites.customSiteFive.whereToOpen;

        customSiteFiveIcon.value =
          data.owlTools.customSites.customSiteFive.icon;

        customSiteFiveTitle.value =
          data.owlTools.customSites.customSiteFive.title;

        customSiteFiveProtocol.value =
          data.owlTools.customSites.customSiteFive.protocol;

        customSiteFiveAddress.value =
          data.owlTools.customSites.customSiteFive.address;
      });
    };

    const saveTheNewData = () => {
      CreateCustomSiteFive(
        customSiteFiveDisplay,
        customSiteFiveWhereToOpen.value,
        customSiteFiveIcon.value,
        customSiteFiveTitle.value,
        customSiteFiveProtocol.value,
        customSiteFiveAddress.value,
      );
    };

    getAndShowData();

    customSiteFiveSaveButton.addEventListener('click', saveTheNewData);
  });
}, 300);
