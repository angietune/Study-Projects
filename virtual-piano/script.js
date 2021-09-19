//Full screen

document.querySelector('.fullscreen').addEventListener('click', toggleScreen);

function toggleScreen (){
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

//Switch notes and letters

document.querySelector('.btn-notes').addEventListener('click', notesActive);
document.querySelector('.btn-letters').addEventListener('click', lettersActive);
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const pianoKey = document.querySelectorAll('.piano-key');

function notesActive () {
    if (!notes.classList.contains('btn-active')) {
        notes.classList.add('btn-active');
        letters.classList.remove('btn-active');
        pianoKey.forEach((elem) => elem.classList.remove('piano-key-letter'));
    }
}

function lettersActive () {
    if (!letters.classList.contains('btn-active')) {
        letters.classList.add('btn-active');
        notes.classList.remove('btn-active');
        pianoKey.forEach((elem) => elem.classList.add('piano-key-letter'));
    }
}

//Keyboard

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('piano-key-active');
  }

  function playAudio(event) {
    const audio = document.querySelector(`audio[id = "${event.code}"]`);
    const pianoKeys = document.querySelector(`.piano-key[id = "${event.code}"]`);
    if (!audio) return;
    if (event.repeat) return;
    pianoKeys.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.piano-key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playAudio);

//Mouse

  const collection = document.querySelectorAll('.piano-key');

  const startSound = (event) => {
      event.target.classList.add('piano-key-active');
      const audio = document.querySelector(`audio[id = "${event.target.id}"]`);
        audio.currentTime = 0;
        audio.play();
  }

const startCorrespondOver = (event) => {
    event.target.classList.add('piano-key-active');
    collection.forEach((elem) => {
        elem.addEventListener('mouseover', startSound);
    });
}

const stopCorrespondOver = (event) => {
    collection.forEach((elem) => {
        event.target.classList.remove('piano-key-active');
        elem.removeEventListener('mouseover', startSound);
    });
}

const PIANO = document.querySelector(".piano");
  PIANO.addEventListener('mousedown', (event) => {
    event.target.classList.add('piano-key-active');
    const audio = document.querySelector(`audio[id = "${event.target.id}"]`);
    audio.currentTime = 0;
    audio.play();
  })

  PIANO.addEventListener('mousedown', startCorrespondOver, false);
  window.addEventListener('mouseup', stopCorrespondOver, false)