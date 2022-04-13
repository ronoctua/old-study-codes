const handleFeedInteractions = () => {
  document.querySelector('#feed').onclick = () => {
    browser.tabs.executeScript({
      file: '../../assets/scripts/get-page-feed-link.js',
    });

    close();
  };
};

export default handleFeedInteractions;
