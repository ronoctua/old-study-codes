var audioElement = document.getElementById('rainAudio');

audioElement.loop = true;

function playAudio() {
  audioElement.play();
}

function pauseAudio() {
  audioElement.pause();
}

var evenOrOdd = 0;

if (document.addEventListener) {
  document.addEventListener('click', (event) => {
    if (evenOrOdd % 2 == 0) {
      playAudio();
    } else {
      pauseAudio();
    }

    evenOrOdd = evenOrOdd + 1;
  });
}
