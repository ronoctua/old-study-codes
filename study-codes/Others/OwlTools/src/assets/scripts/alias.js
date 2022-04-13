const handleAlias = (aliasValue, requestOrigin) => {
  browser.storage.sync.get().then((data) => {
    const aliasAndUrls = data.owlTools.alias.aliasAndUrls;
    const whereToOpenFromPopup = data.owlTools.alias.whereToOpenFromPopup;
    const whereToOpenFromOmnibox = data.owlTools.alias.whereToOpenFromOmnibox;

    let elementAliasCode = aliasValue.replace(/ .*/, '');
    let alias = '';
    let index;
    let num = 0;
    let whereToOpen = '';

    aliasAndUrls.forEach((element) => {
      alias = [...alias, element[0]];

      if (elementAliasCode === element[0]) {
        index = aliasAndUrls.indexOf(element);
      }
    });

    if (!alias.includes(elementAliasCode)) {
      elementAliasCode = '*';
      index = alias.indexOf(elementAliasCode);
    }

    let elementAliasParm =
      aliasValue.indexOf(' ') + 1 === 0
        ? ''
        : aliasValue.substr(aliasValue.indexOf(' ') + 1);

    let elementAliasParamArray = elementAliasParm.split(' ');

    if (elementAliasCode === '*') {
      let firstElement = aliasValue.replace(/ .*/, '');

      elementAliasParm = firstElement + ' ' + elementAliasParm;
      elementAliasParamArray.unshift(firstElement);
    }

    let numOfElementAliasParamArray = elementAliasParm.split(' ').length;
    let aliasUrl = aliasAndUrls[index][1];
    let numOfUrlParam = aliasUrl.replace(/[^\|]/g, '').length;
    let finalParam = '';

    elementAliasParamArray.forEach((element) => {
      num = num + 1;

      if (num < numOfUrlParam) {
        aliasUrl = aliasUrl.replace('|' + num, element);
      } else if (num !== numOfElementAliasParamArray) {
        num === numOfUrlParam
          ? (finalParam = element)
          : (finalParam = finalParam + ' ' + element);
      } else {
        num === numOfUrlParam
          ? (finalParam = element)
          : (finalParam = finalParam + ' ' + element);

        aliasUrl = aliasUrl.replace('|' + numOfUrlParam, finalParam);
      }
    });

    requestOrigin === 'popup'
      ? (whereToOpen = whereToOpenFromPopup)
      : (whereToOpen = whereToOpenFromOmnibox);

    switch (whereToOpen) {
      case '⇠ sidebar':
        browser.sidebarAction.open();
        browser.sidebarAction.setPanel({ panel: aliasUrl });

        close();
        break;

      case 'popup':
        document.location.replace(aliasUrl);
        break;

      case 'popup (iframe method)':
        let popupIframe = document.createElement('iframe');

        document.querySelector('#main-content').style.display = 'none';
        popupIframe.src = aliasUrl;
        document.body.appendChild(popupIframe);
        break;

      case '⇡ new tab':
        browser.tabs.create({
          url: aliasUrl,
          active: true,
        });

        close();
        break;

      case '⇡ new tab (pinned)':
        browser.tabs.create({
          url: aliasUrl,
          active: true,
          pinned: true,
        });

        close();
        break;

      case '⇣ current tab':
        browser.tabs.update({
          url: aliasUrl,
        });

        close();
        break;

      case '⇣ current tab (pinned)':
        browser.tabs.update({
          url: aliasUrl,
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
  });
};

export default handleAlias;
