const createContextMenu = () => {
  browser.contextMenus.create({
    id: 'translate-selection-in-the-sidebar',
    title: browser.i18n.getMessage(
      'contextMenuItemTranslateSelectionInTheSidebar',
    ),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'translate-selection-in-new-tab',
    title: browser.i18n.getMessage('contextMenuItemTranslateSelectionInNewTab'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'translate-the-page',
    title: browser.i18n.getMessage('contextMenuItemTranslateThePage'),
    contexts: ['all'],
  });

  browser.contextMenus.create({
    id: 'pronunciation-on-forvo',
    title: browser.i18n.getMessage('contextMenuItemPronunciationOnForvo'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'pronunciation-on-google',
    title: browser.i18n.getMessage('contextMenuItemPronunciationOnGoogle'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'search-on-google-maps',
    title: browser.i18n.getMessage('contextMenuItemSearchOnGoogleMaps'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'search-on-google',
    title: browser.i18n.getMessage('contextMenuItemSearchOnGoogle'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'search-on-youtube',
    title: browser.i18n.getMessage('contextMenuItemSearchOnYouTube'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'search-on-unsplash',
    title: browser.i18n.getMessage('contextMenuItemSearchOnUnsplash'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'search-on-vimeo',
    title: browser.i18n.getMessage('contextMenuItemSearchOnVimeo'),
    contexts: ['selection'],
  });

  browser.contextMenus.create({
    id: 'open-the-page-in-the-sidebar',
    title: browser.i18n.getMessage('contextMenuItemOpenThePageInTheSidebar'),
    contexts: ['all'],
  });

  browser.contextMenus.create({
    id: 'code-injection',
    title: browser.i18n.getMessage('contextMenuItemCodeInjection'),
    contexts: ['all'],
  });

  browser.contextMenus.create({
    id: 'kill-some-element',
    title: browser.i18n.getMessage('contextMenuItemKillSomeElement'),
    contexts: ['all'],
  });

  browser.contextMenus.create({
    id: 'get-page-feed-link',
    title: browser.i18n.getMessage('contextMenuItemGetPageFeedLink'),
    contexts: ['all'],
  });
};

export default createContextMenu;
