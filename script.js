// script.js music-player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

playPauseBtn.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
    }
});

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercentage;

    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "Play";
    progress.value = 0;
    currentTime.textContent = "0:00";
});

function formatTime(seconds) {
    if(isNaN(seconds)) return "0:00"

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10? "0": ""}${secs}`
}