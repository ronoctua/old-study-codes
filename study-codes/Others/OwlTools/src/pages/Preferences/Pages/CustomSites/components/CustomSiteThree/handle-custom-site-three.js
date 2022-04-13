import CreateOrCheckDefaultData from '../../../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCustomSiteThree from '../../../../../../storage/services/CreateCustomSiteThree.js';

setTimeout(() => {
  const customSiteThreeSaveButton = document.querySelector(
    '#custom-site-three-save-button',
  );
  const customSiteThreeDisplay = true;
  const customSiteThreeWhereToOpen = document.querySelector(
    '#custom-site-three-where-to-open',
  );
  const customSiteThreeIcon = document.querySelector('#custom-site-three-icon');
  const customSiteThreeTitle = document.querySelector(
    '#custom-site-three-title',
  );
  const customSiteThreeProtocol = document.querySelector(
    '#custom-site-three-protocol',
  );
  const customSiteThreeAddress = document.querySelector(
    '#custom-site-three-address',
  );

  CreateOrCheckDefaultData().then(() => {
    const getAndShowData = () => {
      browser.storage.sync.get().then(async (data) => {
        customSiteThreeWhereToOpen.value =
          data.owlTools.customSites.customSiteThree.whereToOpen;

        customSiteThreeIcon.value =
          data.owlTools.customSites.customSiteThree.icon;

        customSiteThreeTitle.value =
          data.owlTools.customSites.customSiteThree.title;

        customSiteThreeProtocol.value =
          data.owlTools.customSites.customSiteThree.protocol;

        customSiteThreeAddress.value =
          data.owlTools.customSites.customSiteThree.address;
      });
    };

    const saveTheNewData = () => {
      CreateCustomSiteThree(
        customSiteThreeDisplay,
        customSiteThreeWhereToOpen.value,
        customSiteThreeIcon.value,
        customSiteThreeTitle.value,
        customSiteThreeProtocol.value,
        customSiteThreeAddress.value,
      );
    };

    getAndShowData();

    customSiteThreeSaveButton.addEventListener('click', saveTheNewData);
  });
}, 300);
