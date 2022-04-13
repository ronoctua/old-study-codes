function hideAndShow(targetItem) {
  let hideOrShowClassName = (targetItem += '-hideorshow');

  let elementOneToShowOrHide = document.querySelector(hideOrShowClassName);
  let elementTwoToShowOrHide = document.querySelector('.hideorshow');

  elementOneToShowOrHide.classList.toggle('show');
  elementOneToShowOrHide.classList.toggle('hide');

  elementTwoToShowOrHide.classList.toggle('hide');
  elementTwoToShowOrHide.classList.toggle('show');
}

function cursorShowHideElements(elementsList) {
  setTimeout(async () => {
    await elementsList.forEach((targetElement) => {
      let theElement = document.querySelector(targetElement);

      theElement.onmouseover = () => {
        hideAndShow(targetElement);
      };

      theElement.onmouseout = () => {
        hideAndShow(targetElement);
      };
    });

    document.querySelector('.initial-cursor-impediment').classList.add('hide');
  }, 500);
}
