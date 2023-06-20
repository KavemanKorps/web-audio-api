const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");

const audioContext = new AudioContext();    // load up our audio context -needed for playing audio
const audio = new Audio("./audio/smooth-jazz.mp3");

const source = audioContext.createMediaElementSource(audio);    
// create source for audio context by making a media element

source.connect(audioContext.destination);

// play/pause audio when buttons are clicked
playBtn.addEventListener("click", () => {
    audio.play();   
});

pauseBtn.addEventListener("click", () => {
    audio.pause();
});

console.log(audioContext);
// console.log("hello");