fetch('../../../../../docs/changelog/changelog.en.md')
  .then((response) => response.text())
  .then(
    (text) =>
      (document.getElementById('changelog-content').innerHTML = marked(text)),
  );
