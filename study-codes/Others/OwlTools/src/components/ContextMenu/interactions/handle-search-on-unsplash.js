const handleSearchOnUnsplash = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://unsplash.com/s/photos/" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handleSearchOnUnsplash;
