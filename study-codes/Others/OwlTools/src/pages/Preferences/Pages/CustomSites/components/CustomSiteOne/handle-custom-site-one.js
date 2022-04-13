import CreateOrCheckDefaultData from '../../../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCustomSiteOne from '../../../../../../storage/services/CreateCustomSiteOne.js';

setTimeout(() => {
  const customSiteOneSaveButton = document.querySelector(
    '#custom-site-one-save-button',
  );
  const customSiteOneDisplay = true;
  const customSiteOneWhereToOpen = document.querySelector(
    '#custom-site-one-where-to-open',
  );
  const customSiteOneIcon = document.querySelector('#custom-site-one-icon');
  const customSiteOneTitle = document.querySelector('#custom-site-one-title');
  const customSiteOneProtocol = document.querySelector(
    '#custom-site-one-protocol',
  );
  const customSiteOneAddress = document.querySelector(
    '#custom-site-one-address',
  );

  CreateOrCheckDefaultData().then(() => {
    const getAndShowData = () => {
      browser.storage.sync.get().then(async (data) => {
        customSiteOneWhereToOpen.value =
          data.owlTools.customSites.customSiteOne.whereToOpen;

        customSiteOneIcon.value = data.owlTools.customSites.customSiteOne.icon;

        customSiteOneTitle.value =
          data.owlTools.customSites.customSiteOne.title;

        customSiteOneProtocol.value =
          data.owlTools.customSites.customSiteOne.protocol;

        customSiteOneAddress.value =
          data.owlTools.customSites.customSiteOne.address;
      });
    };

    const saveTheNewData = () => {
      CreateCustomSiteOne(
        customSiteOneDisplay,
        customSiteOneWhereToOpen.value,
        customSiteOneIcon.value,
        customSiteOneTitle.value,
        customSiteOneProtocol.value,
        customSiteOneAddress.value,
      );
    };

    getAndShowData();

    customSiteOneSaveButton.addEventListener('click', saveTheNewData);
  });
}, 300);
