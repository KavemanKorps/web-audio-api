// GLOBAL ACCESS TO AUDIO CONTEXT:
let audioContext;
const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", () => {
    audio.play();
});

/* we're gonna have to call the fetch api with the file path and get an array buffer from that.
because we have to wait (calling this func from elsewhere), we need to declare it as an async func. */

async function getFile(filePath) {
    // response returns the raw data to us
    const response = await fetch(filePath);
    // we take that response and make an array buffer with it (standard JS way of dealing w/ files):
    const arrayBuffer = await response.arrayBuffer();
    // then we create an audio buffer (from which we can play the sound):
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}