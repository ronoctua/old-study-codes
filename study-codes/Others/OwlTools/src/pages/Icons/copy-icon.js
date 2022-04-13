const clickAnimation = () => {
  document.body.classList.add('bg-done');

  setTimeout(() => {
    document.body.classList.remove('bg-done');
  }, 400);
};

const handleCopyIcon = () => {
  let targetElement = event.target || event.srcElement;
  let dummy = document.createElement('textarea');

  document.body.appendChild(dummy);
  dummy.value = targetElement.textContent;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  clickAnimation();
};

document.querySelector('#all-icons').addEventListener('click', () => {
  handleCopyIcon();
});
