const handleDownloadLinksToGitHubFiles = () => {
  // NEW GITHUB PAGE

  setTimeout(() => {
    if (
      document.querySelector('.Box-row') &&
      !document.querySelector('.download-raw') &&
      document.querySelector('#branch-select-menu')
    ) {
      const componentsBoxRow = document.querySelectorAll('.Box-row');

      componentsBoxRow.forEach((boxRow) => {
        let componentBoxDownload = document.createElement('div');

        componentBoxDownload.className = 'download-raw';
        componentBoxDownload.style.marginLeft = '12px';
        componentBoxDownload.style.minWidth = '15px';

        if (
          !boxRow.querySelector('svg.octicon') ||
          boxRow.querySelector('svg.octicon.octicon-file-directory') ||
          boxRow.querySelector('svg.octicon.octicon-file-submodule')
        ) {
          boxRow.appendChild(componentBoxDownload);
        } else {
          let linkElement = document.createElement('a');
          let downloadIcon = document.createTextNode('📥');
          let link = boxRow.querySelector('a').href;

          link =
            'https://raw.githubusercontent.com' +
            new URL(link.replace('/blob', '')).pathname;

          linkElement.href = link;

          linkElement.appendChild(downloadIcon);
          componentBoxDownload.appendChild(linkElement);
          boxRow.appendChild(componentBoxDownload);
        }
      });
    }
  }, 1300);

  // OLD GITHUB PAGE
  if (
    document.querySelector('table.files') &&
    !document.querySelector('th.download-raw')
  ) {
    const tableHeadTr = document.querySelector('table.files thead tr');
    const tableItens = document.querySelectorAll('tr.js-navigation-item');

    var thItem = document.createElement('th');

    thItem.className = 'download-raw';

    tableHeadTr.appendChild(thItem);

    tableItens.forEach((item) => {
      let tdItem = document.createElement('td');

      tdItem.className = 'download-raw';
      tdItem.style.width = '34px';
      tdItem.style.height = '34px';

      if (
        item.classList.contains('up-tree') ||
        item.querySelector('td.icon svg.octicon.octicon-file-directory') ||
        item.querySelector('td.icon svg.octicon.octicon-file-submodule')
      ) {
        item.appendChild(tdItem);
      } else {
        let linkElement = document.createElement('a');
        let downloadIcon = document.createTextNode('📥');
        let link = item.querySelector('td.content a').href;

        link =
          'https://raw.githubusercontent.com' +
          new URL(link.replace('/blob', '')).pathname;

        linkElement.href = link;

        linkElement.appendChild(downloadIcon);
        tdItem.appendChild(linkElement);
        item.appendChild(tdItem);
      }
    });
  }
};

const elementToObserve = document.querySelector('#js-repo-pjax-container');

browser.storage.sync.get().then((data) => {
  if (data.owlTools.extraFeatures.githubFilesDownloadIcon.status === true) {
    elementToObserve.addEventListener('DOMSubtreeModified', () =>
      handleDownloadLinksToGitHubFiles(),
    );
  }
});
