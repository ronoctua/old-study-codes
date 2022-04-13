window.onload = function () {
  var sidebarTheme = '';
  var popupTheme = '';

  browser.storage.sync.get().then(async (data) => {
    sidebarTheme = data.owlTools.generalSettings.themes.sidebarTheme;
    popupTheme = data.owlTools.generalSettings.themes.popupTheme;

    if (
      document.head.contains(document.querySelector('[title="sidebar-theme"]'))
    ) {
      let pageThemeLink = document.querySelector('[title="sidebar-theme"]')
        .href;
      let path = pageThemeLink.substring(0, pageThemeLink.lastIndexOf('/'));
      let newThemeLink = path + '/' + sidebarTheme + '-theme.css';

      document.querySelector('[title="sidebar-theme"]').href = newThemeLink;
    } else if (
      document.head.contains(document.querySelector('[title="popup-theme"]'))
    ) {
      let pageThemeLink = document.querySelector('[title="popup-theme"]').href;
      let path = pageThemeLink.substring(0, pageThemeLink.lastIndexOf('/'));
      let newThemeLink = path + '/' + popupTheme + '-theme.css';

      document.querySelector('[title="sidebar-theme"]').href = newThemeLink;
    }
  });
};
