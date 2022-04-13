// Despite sites with 'X-Frame-Options Policy'
const despiteXFrameOptions = () => {
  browser.webRequest.onHeadersReceived.addListener(
    (info) => {
      let headers = info.responseHeaders.filter((header) => {
        let name = header.name.toLowerCase();

        return name !== 'x-frame-options' && name !== 'frame-options';
      });
      return { responseHeaders: headers };
    },
    {
      urls: ['http://*/*', 'https://*/*'],
      types: ['sub_frame'],
    },
    ['blocking', 'responseHeaders'],
  );
};

export default despiteXFrameOptions;
