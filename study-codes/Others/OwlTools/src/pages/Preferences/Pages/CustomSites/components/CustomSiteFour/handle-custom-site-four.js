import CreateOrCheckDefaultData from '../../../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCustomSiteFour from '../../../../../../storage/services/CreateCustomSiteFour.js';

setTimeout(() => {
  const customSiteFourSaveButton = document.querySelector(
    '#custom-site-four-save-button',
  );
  const customSiteFourDisplay = true;
  const customSiteFourWhereToOpen = document.querySelector(
    '#custom-site-four-where-to-open',
  );
  const customSiteFourIcon = document.querySelector('#custom-site-four-icon');
  const customSiteFourTitle = document.querySelector('#custom-site-four-title');
  const customSiteFourProtocol = document.querySelector(
    '#custom-site-four-protocol',
  );
  const customSiteFourAddress = document.querySelector(
    '#custom-site-four-address',
  );

  CreateOrCheckDefaultData().then(() => {
    const getAndShowData = () => {
      browser.storage.sync.get().then(async (data) => {
        customSiteFourWhereToOpen.value =
          data.owlTools.customSites.customSiteFour.whereToOpen;

        customSiteFourIcon.value =
          data.owlTools.customSites.customSiteFour.icon;

        customSiteFourTitle.value =
          data.owlTools.customSites.customSiteFour.title;

        customSiteFourProtocol.value =
          data.owlTools.customSites.customSiteFour.protocol;

        customSiteFourAddress.value =
          data.owlTools.customSites.customSiteFour.address;
      });
    };

    const saveTheNewData = () => {
      CreateCustomSiteFour(
        customSiteFourDisplay,
        customSiteFourWhereToOpen.value,
        customSiteFourIcon.value,
        customSiteFourTitle.value,
        customSiteFourProtocol.value,
        customSiteFourAddress.value,
      );
    };

    getAndShowData();

    customSiteFourSaveButton.addEventListener('click', saveTheNewData);
  });
}, 300);
