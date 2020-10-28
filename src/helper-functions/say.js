export default function say(word) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  } else {
    say2(word);
  }
}

function say2(word) {
  let ctx = new AudioContext();
  let audio;

  fetch(
    `http://api.voicerss.org/?key=aebe03bb99db41169c32a57571fe577e&hl=en-us&v=Mary&c=MP3&src=${word}`
  )
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
    .then((decodeAudioData) => {
      audio = decodeAudioData;
    })
    .then(() => {
      let playSound = ctx.createBufferSource();
      playSound.buffer = audio;
      playSound.connect(ctx.destination);
      playSound.start(ctx.currentTime);
    })
    .catch((err) => {
      console.log(err);
    });
}
