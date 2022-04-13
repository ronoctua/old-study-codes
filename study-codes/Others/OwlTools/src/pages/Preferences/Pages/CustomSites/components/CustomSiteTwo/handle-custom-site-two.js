import CreateOrCheckDefaultData from '../../../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCustomSiteTwo from '../../../../../../storage/services/CreateCustomSiteTwo.js';

setTimeout(() => {
  const customSiteTwoSaveButton = document.querySelector(
    '#custom-site-two-save-button',
  );
  const customSiteTwoDisplay = true;
  const customSiteTwoWhereToOpen = document.querySelector(
    '#custom-site-two-where-to-open',
  );
  const customSiteTwoIcon = document.querySelector('#custom-site-two-icon');
  const customSiteTwoTitle = document.querySelector('#custom-site-two-title');
  const customSiteTwoProtocol = document.querySelector(
    '#custom-site-two-protocol',
  );
  const customSiteTwoAddress = document.querySelector(
    '#custom-site-two-address',
  );

  CreateOrCheckDefaultData().then(() => {
    const getAndShowData = () => {
      browser.storage.sync.get().then(async (data) => {
        customSiteTwoWhereToOpen.value =
          data.owlTools.customSites.customSiteTwo.whereToOpen;

        customSiteTwoIcon.value = data.owlTools.customSites.customSiteTwo.icon;

        customSiteTwoTitle.value =
          data.owlTools.customSites.customSiteTwo.title;

        customSiteTwoProtocol.value =
          data.owlTools.customSites.customSiteTwo.protocol;

        customSiteTwoAddress.value =
          data.owlTools.customSites.customSiteTwo.address;
      });
    };

    const saveTheNewData = () => {
      CreateCustomSiteTwo(
        customSiteTwoDisplay,
        customSiteTwoWhereToOpen.value,
        customSiteTwoIcon.value,
        customSiteTwoTitle.value,
        customSiteTwoProtocol.value,
        customSiteTwoAddress.value,
      );
    };

    getAndShowData();

    customSiteTwoSaveButton.addEventListener('click', saveTheNewData);
  });
}, 300);
