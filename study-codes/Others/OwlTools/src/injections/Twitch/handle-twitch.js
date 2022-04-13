const handleTwitchScrollbar = () => {
  const modifyScrollbars = () => {
    let allSimplebarScrollbar = document.querySelectorAll(
      '.simplebar-scrollbar',
    );
    let allSimplebarTrack = document.querySelectorAll('.simplebar-track');

    allSimplebarScrollbar.forEach((scrollbarElement) => {
      scrollbarElement.setAttribute('style', 'width: 14px; z-index: 99999');
    });

    allSimplebarTrack.forEach((scrollbarElement) => {
      scrollbarElement.setAttribute('style', 'width: 14px; z-index: 999');
    });
  };

  modifyScrollbars();

  setInterval(modifyScrollbars, 3500);
};

browser.storage.sync.get().then((data) => {
  if (data.owlTools.extraFeatures.twitchScrollbar.status === true) {
    handleTwitchScrollbar();
  }
});
