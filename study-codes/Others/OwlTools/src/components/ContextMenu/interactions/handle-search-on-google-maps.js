const handleSearchOnGoogleMaps = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://www.google.com/maps/search/" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handleSearchOnGoogleMaps;
