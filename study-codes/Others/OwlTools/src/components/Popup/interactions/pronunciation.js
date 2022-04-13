const handlePronunciationInteractions = () => {
  var pronunciationUrl = '';
  var pronunciationWhereToOpen = '';

  browser.storage.sync.get().then((data) => {
    pronunciationUrl =
      data.owlTools.pronunciation.popupSiteOne.protocol +
      data.owlTools.pronunciation.popupSiteOne.address;

    pronunciationWhereToOpen =
      data.owlTools.pronunciation.popupSiteOne.whereToOpen;
  });

  document.querySelector('#pronunciation').onclick = () => {
    switch (pronunciationWhereToOpen) {
      case '⇠ sidebar':
        browser.sidebarAction.open();
        browser.sidebarAction.setPanel({ panel: pronunciationUrl });

        close();
        break;

      case 'popup':
        document.location.replace(pronunciationUrl);

        break;

      case 'popup (iframe method)':
        let popupIframe = document.createElement('iframe');

        document.querySelector('#main-content').style.display = 'none';
        popupIframe.src = pronunciationUrl;
        document.body.appendChild(popupIframe);

        break;

      case '⇡ new tab':
        browser.tabs.create({
          url: pronunciationUrl,
          active: true,
        });

        close();
        break;

      case '⇡ new tab (pinned)':
        browser.tabs.create({
          url: pronunciationUrl,
          active: true,
          pinned: true,
        });

        close();
        break;

      case '⇣ current tab':
        browser.tabs.update({
          url: pronunciationUrl,
        });

        close();
        break;

      case '⇣ current tab (pinned)':
        browser.tabs.update({
          url: pronunciationUrl,
          pinned: true,
        });

        close();
        break;

      default:
        console.log('Error when trying to define where the site will open.');

        close();
        break;
    }
  };
};

export default handlePronunciationInteractions;
