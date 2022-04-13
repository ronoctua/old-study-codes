var theSelection = getSelection().toString();

browser.runtime.onMessage.addListener(() => {
  return Promise.resolve({ response: theSelection });
});
