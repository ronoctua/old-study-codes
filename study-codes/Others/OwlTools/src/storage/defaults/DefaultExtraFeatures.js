const DefaultGeneralSettings = {
  extraFeatures: {
    githubFilesDownloadIcon: {
      status: true,
    },
    youtubeClosedCaption: {
      status: true,
      languageCodes: 'pt pt-BR pt-PT pt-EU pt-AO pt-MZ',
    },
    youtubeVersatileButtons: {
      status: true,
      buttonOne: {
        status: false,
        content: '📥',
        address: 'https://youtubePP.com/watch?v=<yt-id>',
        whereToOpen: '⇡ new tab',
      },
      buttonTwo: {
        status: false,
        content: '🕺',
        address: 'https://gifs.com/?source=<yt-url>',
        whereToOpen: '⇡ new tab',
      },
      buttonThree: {
        status: false,
        content: '📷',
        address:
          'https://toolbxs.com/downloader/youtube_thumbnail/search?url=<yt-url>',
        whereToOpen: '⇡ new tab',
      },
      buttonFour: {
        status: false,
        content: '🗣',
        address: 'https://downsub.com/?url=<yt-url>',
        whereToOpen: '⇡ new tab',
      },
    },
    twitchScrollbar: {
      status: true,
    },
  },
};

export default DefaultGeneralSettings;
