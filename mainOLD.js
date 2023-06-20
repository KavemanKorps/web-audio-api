const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");

const audioContext = new AudioContext();    // load up our audio context -needed for playing audio
const audio = new Audio("./audio/smooth-jazz.mp3");

// WITH "source" and "connect" commented out, audio will still play. However, we won't be able to tinker with 
// its volume if we do so:
// create source for audio context by making a media element
const source = audioContext.createMediaElementSource(audio);

// this is a volume "node":
const volume = audioContext.createGain();
// HERE'S HOW TO INC/DECREASE VOLUME OF AUDIO:
volume.gain.value = 0.2;

source.connect(audioContext.destination);

// play/pause audio when buttons are clicked
playBtn.addEventListener("click", () => {
    // audioContexts have a "state" property:
    if (audioContext.state === "suspended") {
        // with this "if", if we pause and resume playing, the audio will not start from the beginning:
        audioContext.resume();
    }
    audio.play();   
});

pauseBtn.addEventListener("click", () => {
    audio.pause();
});

stopBtn.addEventListener("click", () => {
    audio.pause();
    // take audio back to the beginning ("currentTime" is in seconds):
    audio.currentTime = 0;
});

/* here we learned ab/ the web audio api, how to load an audio file synchronously, create an audio context, 
and from that create a media element, an audio source node, which we connected to the destination of the 
audio context; as well as how to put things inbetween the source and destination (volume node) */