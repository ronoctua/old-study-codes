var divWithAllContent = document.createElement('div');
divWithAllContent.id = 'div-with-all-content';

var shadowRootElement = divWithAllContent.attachShadow({ mode: 'open' });

fetch(
  browser.runtime.getURL(
    'src/components/EmbedContentBox/embed-content-box.html',
  ),
)
  .then((response) => response.text())
  .then((data) => {
    shadowRootElement.innerHTML = data;

    fetch(
      browser.runtime.getURL(
        'src/components/EmbedContentBox/embed-content-box.css',
      ),
    )
      .then((content) => content.text())
      .then((text) => {
        shadowRootElement
          .querySelector('#embed-content-box')
          .insertAdjacentHTML('beforebegin', '<style>' + text + '</style>');
      });

    shadowRootElement.querySelector(
      'iframe#embed-content-box-iframe',
    ).src = `${targetURL}`;

    var divWithAllContentElement = document.querySelector(
      '#div-with-all-content',
    );

    var embedContentBoxElement = shadowRootElement.querySelector(
      '#embed-content-box',
    );

    var embedContentBoxIframeSpaceElement = shadowRootElement.querySelector(
      '#embed-content-box-iframe-space',
    );

    var embedContentBoxMenu = shadowRootElement.querySelector(
      '.embed-content-box-menu',
    );

    var embedContentBoxOpenTab1MenuItem = shadowRootElement.querySelector(
      '.menu-item.open-tab1',
    );

    var embedContentBoxOpenTab2MenuItem = shadowRootElement.querySelector(
      '.menu-item.open-tab2',
    );

    var embedContentBoxClose1MenuItem = shadowRootElement.querySelector(
      '.menu-item.close1',
    );

    var embedContentBoxClose2MenuItem = shadowRootElement.querySelector(
      '.menu-item.close2',
    );

    function removeEmbedContentBox() {
      divWithAllContentElement.remove();
    }

    function openNewTab() {
      window.open(targetURL, '_blank');
    }

    embedContentBoxOpenTab1MenuItem.onclick = () => openNewTab();
    embedContentBoxOpenTab2MenuItem.onclick = () => openNewTab();
    embedContentBoxClose1MenuItem.onclick = () => removeEmbedContentBox();
    embedContentBoxClose2MenuItem.onclick = () => removeEmbedContentBox();
    embedContentBoxMenu.onclick = () => removeEmbedContentBox();
    embedContentBoxElement.onclick = () => removeEmbedContentBox();
    embedContentBoxIframeSpaceElement.onclick = () => removeEmbedContentBox();
  });

document.body.appendChild(divWithAllContent);
