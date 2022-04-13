import despiteXFrameOptions from '../../assets/scripts/despite-x-frame-options.js';

import handleTranslateSelectionInTheSidebar from './interactions/handle-translate-selection-in-the-sidebar.js';
import handleTranslateSelectionInNewTab from './interactions/handle-translate-selection-in-new-tab.js';
import handleTranslateThePage from './interactions/handle-translate-the-page.js';
import handlePronunciationOnForvo from './interactions/handle-pronunciation-on-forvo.js';
import handlePronunciationOnGoogle from './interactions/handle-pronunciation-on-google.js';
import handleSearchOnGoogleMaps from './interactions/handle-search-on-google-maps.js';
import handleSearchOnGoogle from './interactions/handle-search-on-google.js';
import handleSearchOnYouTube from './interactions/handle-search-on-youtube.js';
import handleSearchOnUnsplash from './interactions/handle-search-on-unsplash.js';
import handleSearchOnVimeo from './interactions/handle-search-on-vimeo.js';
import handleOpenThePageInTheSidebar from './interactions/handle-open-the-page-in-the-sidebar.js';
import handleCodeInjection from './interactions/handle-code-injection.js';
import handleKillSomeElement from './interactions/handle-kill-some-element.js';
import handleGetPageFeedLink from './interactions/handle-get-page-feed-link.js';

const createContextMenuInteractions = () => {
  browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'translate-selection-in-the-sidebar':
        handleTranslateSelectionInTheSidebar();
        break;

      case 'translate-selection-in-new-tab':
        handleTranslateSelectionInNewTab();
        break;

      case 'translate-the-page':
        var encodedPageUrl = encodeURIComponent(info.pageUrl);
        handleTranslateThePage(encodedPageUrl);
        break;

      case 'pronunciation-on-forvo':
        despiteXFrameOptions();
        handlePronunciationOnForvo();
        break;

      case 'pronunciation-on-google':
        despiteXFrameOptions();
        handlePronunciationOnGoogle();
        break;

      case 'search-on-google-maps':
        despiteXFrameOptions();
        handleSearchOnGoogleMaps();
        break;

      case 'search-on-google':
        despiteXFrameOptions();
        handleSearchOnGoogle();
        break;

      case 'search-on-youtube':
        despiteXFrameOptions();
        handleSearchOnYouTube();
        break;

      case 'search-on-unsplash':
        despiteXFrameOptions();
        handleSearchOnUnsplash();
        break;

      case 'search-on-vimeo':
        despiteXFrameOptions();
        handleSearchOnVimeo();
        break;

      case 'open-the-page-in-the-sidebar':
        handleOpenThePageInTheSidebar();
        break;

      case 'code-injection':
        handleCodeInjection();
        break;

      case 'kill-some-element':
        handleKillSomeElement();
        break;

      case 'get-page-feed-link':
        handleGetPageFeedLink();
        break;
    }
  });
};

export default createContextMenuInteractions;
