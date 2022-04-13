const handleCustomSitesInteraction = () => {
  var customSiteOneWhereToOpen = '';
  var customSiteOneAddress = '';

  var customSiteTwoWhereToOpen = '';
  var customSiteTwoAddress = '';

  var customSiteThreeWhereToOpen = '';
  var customSiteThreeAddress = '';

  var customSiteFourWhereToOpen = '';
  var customSiteFourAddress = '';

  var customSiteFiveWhereToOpen = '';
  var customSiteFiveAddress = '';

  browser.storage.sync.get().then((data) => {
    customSiteOneWhereToOpen =
      data.owlTools.customSites.customSiteOne.whereToOpen;
    customSiteOneAddress =
      data.owlTools.customSites.customSiteOne.protocol +
      data.owlTools.customSites.customSiteOne.address;

    customSiteTwoWhereToOpen =
      data.owlTools.customSites.customSiteTwo.whereToOpen;
    customSiteTwoAddress =
      data.owlTools.customSites.customSiteTwo.protocol +
      data.owlTools.customSites.customSiteTwo.address;

    customSiteThreeWhereToOpen =
      data.owlTools.customSites.customSiteThree.whereToOpen;
    customSiteThreeAddress =
      data.owlTools.customSites.customSiteThree.protocol +
      data.owlTools.customSites.customSiteThree.address;

    customSiteFourWhereToOpen =
      data.owlTools.customSites.customSiteFour.whereToOpen;
    customSiteFourAddress =
      data.owlTools.customSites.customSiteFour.protocol +
      data.owlTools.customSites.customSiteFour.address;

    customSiteFiveWhereToOpen =
      data.owlTools.customSites.customSiteFive.whereToOpen;
    customSiteFiveAddress =
      data.owlTools.customSites.customSiteFive.protocol +
      data.owlTools.customSites.customSiteFive.address;
  });

  const handleWebsiteOpening = (whereToOpen, websiteAddress) => {
    switch (whereToOpen) {
      case '⇠ sidebar':
        browser.sidebarAction.open();
        browser.sidebarAction.setPanel({ panel: websiteAddress });

        close();
        break;

      case 'popup':
        document.location.replace(websiteAddress);

        break;

      case 'popup (iframe method)':
        let popupIframe = document.createElement('iframe');

        document.querySelector('#main-content').style.display = 'none';
        popupIframe.src = websiteAddress;
        document.body.appendChild(popupIframe);

        break;

      case '⇡ new tab':
        browser.tabs.create({
          url: websiteAddress,
          active: true,
        });

        close();
        break;

      case '⇡ new tab (pinned)':
        browser.tabs.create({
          url: websiteAddress,
          active: true,
          pinned: true,
        });

        close();
        break;

      case '⇣ current tab':
        browser.tabs.update({
          url: websiteAddress,
        });

        close();
        break;

      case '⇣ current tab (pinned)':
        browser.tabs.update({
          url: websiteAddress,
          pinned: true,
        });

        close();
        break;

      default:
        console.log(
          'Error when trying to define where the site will open. (handle-custom-sites-interaction.js)',
        );

        close();
        break;
    }
  };

  document.querySelector('#custom-site-one').onclick = () => {
    handleWebsiteOpening(customSiteOneWhereToOpen, customSiteOneAddress);
  };

  document.querySelector('#custom-site-two').onclick = () => {
    handleWebsiteOpening(customSiteTwoWhereToOpen, customSiteTwoAddress);
  };

  document.querySelector('#custom-site-three').onclick = () => {
    handleWebsiteOpening(customSiteThreeWhereToOpen, customSiteThreeAddress);
  };

  document.querySelector('#custom-site-four').onclick = () => {
    handleWebsiteOpening(customSiteFourWhereToOpen, customSiteFourAddress);
  };

  document.querySelector('#custom-site-five').onclick = () => {
    handleWebsiteOpening(customSiteFiveWhereToOpen, customSiteFiveAddress);
  };
};

export default handleCustomSitesInteraction;
