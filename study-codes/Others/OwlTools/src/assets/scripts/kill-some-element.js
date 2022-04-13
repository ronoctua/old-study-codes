for (let i = 0; i < document.getElementsByTagName('a').length; i++) {
  document.getElementsByTagName('a')[i].style.pointerEvents = 'none';
}

function handler(e) {
  e = e || window.event;
  let target = e.target || e.srcElement;

  target.style.display = 'none';
  document.removeEventListener('click', handler, false);
  document.body.style.cursor = 'default';

  for (let i = 0; i < document.getElementsByTagName('a').length; i++) {
    document.getElementsByTagName('a')[i].style.pointerEvents = 'initial';
  }
}

document.addEventListener('click', handler, false);
document.body.style.cursor = 'crosshair';
