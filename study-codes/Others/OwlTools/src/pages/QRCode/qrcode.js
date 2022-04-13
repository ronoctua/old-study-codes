const qrCodeTextArea = document.querySelector('#qrcode-textarea');
const qrCodeContent = document.querySelector('#qrcode-content');

qrCodeTextArea.addEventListener('input', () => {
  let qrCode = kjua({
    render: 'convas',
    crisp: true,
    minVersion: 3,
    ecLevel: 'H',
    size: 270,
    ratio: null,
    fill: '#333',
    back: '#fff',
    quiet: 2,
    mode: 'plain',
    text: qrCodeTextArea.value,
  });

  if (document.querySelector('canvas')) {
    document.querySelector('canvas').remove();
  }

  qrCodeContent.appendChild(qrCode);
});

browser.tabs.query({ currentWindow: true, active: true }).then((data) => {
  qrCodeTextArea.value = data[0].url;

  setTimeout(qrCodeTextArea.dispatchEvent(new Event('input')), 300);
});
