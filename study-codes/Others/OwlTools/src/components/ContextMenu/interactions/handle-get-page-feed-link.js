const handleGetPageFeedLink = () => {
  browser.tabs.executeScript({
    file: '../../../src/assets/scripts/get-page-feed-link.js',
  });
};

export default handleGetPageFeedLink;
