setTimeout(() => {
  const contentElement = document.querySelector('body');
  var buttons = document.querySelectorAll('.click-animation');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      contentElement.classList.add('bg-done');

      setTimeout(() => {
        contentElement.classList.remove('bg-done');
      }, 400);
    });
  }
}, 500);
