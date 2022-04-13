const handleSearchOnYouTube = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://www.youtube.com/results?search_query=" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handleSearchOnYouTube;
