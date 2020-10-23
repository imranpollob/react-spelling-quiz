export default function say(word) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
}
