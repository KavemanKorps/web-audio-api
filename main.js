// GLOBAL ACCESS TO AUDIO CONTEXT:
let audioContext;
let samples;

const startCtxBtn = document.querySelector(".start");
const setupSamplesBtn = document.querySelector(".setup-samples");
const playSampleBtn = document.querySelector(".play-sample");

const samplePaths = ["./audio/smooth-jazz.mp3", "./audio/explosionLoud.mp3", "./audio/laser.mp3"];

startCtxBtn.addEventListener("click", () => {
    audioContext = new AudioContext();
    console.log("Audio Context Started");
});

setupSamplesBtn.addEventListener("click", () => {
    /* since setupSamples is asynchronous (it returns a promise), we use then() after that promise is fulfilled.
    (response) is what is returned by that async func. (audioBuffers) */
    setupSamples(samplePaths).then((response) => {
        // our globally accessable "samples" var now contains the audio buffers!
        samples = response; 
        // this returns an array of fulfilled promises instead of an array of AudioBuffers
        console.log(samples);
        // a nested addEventListener! For actually playing the sample:
        playSampleBtn.addEventListener("click", () => {
            // we set this to a var for pausing later on...
            const playing = playSample(samples[0], 0);
            setTimeout(() => {
                playing.stop();     // stop audio from playing after 3 seconds
            }, 3000);
        });
    })
});

/* we're gonna have to call the fetch api with the file path and get an array buffer from that.
because we have to wait (calling this func from elsewhere), we need to declare it as an async func. */

// THIS IS GOOD:
async function getFile(filePath) {
    // response returns the raw data to us
    const response = await fetch(filePath);
    // we take that response and make an array buffer with it (standard JS way of dealing w/ files):
    const arrayBuffer = await response.arrayBuffer();
    // then we create an audio buffer (from which we can play the sound):
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}


// THIS IS GOOD:
// func to setup audio files we need to load. Passed an array:
async function setupSamples(paths) {
    console.log("setting up samples...");
    const audioBuffers = [];

    // why don't we use normal for loop? we use a "for of" loop because of our awaiting:
    for (const path of paths) {
        // w/p the "await" here, it would just return an array of promises instead of an array of audio buffers!:
        const sample = await getFile(path);
        audioBuffers.push(sample);
    }
    console.log("done.");
    return audioBuffers;
}

// THIS IS GOOD:
// now a func. for actually playing the audio:
function playSample(audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    // ERROR IS HERE:
    sampleSource.buffer = audioBuffer;   // declare sampleSource's buffer (audio itself)
    sampleSource.connect(audioContext.destination);  // audioContext.destination is the speakers
    sampleSource.start(time);   // play audio!
    return sampleSource; // return for pausing purposes
}

// every time we want to play our audio, we need to create an AudioBuffer every single time! (most optimized)