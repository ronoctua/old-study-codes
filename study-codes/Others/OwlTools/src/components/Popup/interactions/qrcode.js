const handleQRCode = () => {
  document.querySelector('#qrcode').onclick = () => {
    document.location.replace('../../../src/pages/QRCode/index.html');
  };
};

export default handleQRCode;
