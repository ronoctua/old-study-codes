const DefaultAlias = {
  alias: {
    aliasAndUrls: [
      ['*', 'https://google.com/search?q=|1'],
      ['git', 'https://github.com/search?q=|1'],
      ['wiki', 'https://|1.wikipedia.org/wiki/|2'],
      ['mail', 'https://gmail.com/'],
      ['y', 'https://www.youtube.com/results?search_query=|1'],
      ['t', 'https://translate.google.com/?sl=auto&tl=|1&text=|2'],
    ],
    whereToOpenFromPopup: '⇡ new tab',
    whereToOpenFromOmnibox: '⇣ current tab',
  },
};

export default DefaultAlias;
