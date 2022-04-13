import despiteXFrameOptions from '../../assets/scripts/despite-x-frame-options.js';
import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

import handleAliasInteractions from './interactions/alias.js';
import handlePronunciationInteractions from './interactions/pronunciation.js';
import handleTranslateInteractions from './interactions/translate.js';
import handleKillInteractions from './interactions/kill.js';
import handleCodeInjection from './interactions/code-injection.js';
import handleLoremIpsum from './interactions/lorem-ipsum.js';
import handleFeedInteractions from './interactions/feed.js';
import handleQRCode from './interactions/qrcode.js';
import handleCustomSitesInteraction from './interactions/custom-sites.js';
import handleSidebarInteractions from './interactions/sidebar.js';
import handlePreferencesInteractions from './interactions/preferences.js';

let menuElementsList = [
  '#popup-alias-bar',
  '#pronunciation',
  '#translate-popup',
  '#translate-sidebar',
  '#translate-page',
  '#translate-tab',
  '#kill',
  '#injection',
  '#lorem-ipsum',
  '#feed',
  '#qrcode',
  '#sidebar',
  '#rain',
  '#icons',
  '#notes',
  '#custom-site-one',
  '#custom-site-two',
  '#custom-site-three',
  '#custom-site-four',
  '#custom-site-five',
  '#preferences',
];

cursorShowHideElements(menuElementsList);

setTimeout(() => {
  CreateOrCheckDefaultData().then(() => {
    despiteXFrameOptions();
    handleAliasInteractions();
    handlePronunciationInteractions();
    handleTranslateInteractions();
    handleKillInteractions();
    handleCodeInjection();
    handleLoremIpsum();
    handleFeedInteractions();
    handleQRCode();
    handleCustomSitesInteraction();
    handleSidebarInteractions();
    handlePreferencesInteractions();
  });
}, 400);
