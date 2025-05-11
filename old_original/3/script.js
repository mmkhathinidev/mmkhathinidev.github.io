// Song playlist with titles, audio files, and lyric file paths
const songs = [
    {
        title: "Always and Forever - Luther Vandross",
        src: "songs/luther-vandross-always-and-forever.mp3",
        lyricsFile: "songs/lyrics/luther-vandross-always-and-forever.txt"
    },
    {
        title: "Kem - I Can't Stop Loving You",
        src: "songs/kem-cant-stop-lovin-you.mp3",
        lyricsFile: "songs/lyrics/kem-cant-stop-lovin-you.txt"
    }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.querySelector(".songlyrics");

// Load the current song and its lyrics from an external file
async function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    try {
        const response = await fetch(song.lyricsFile);
        const lyricsHTML = await response.text();
        lyricsContainer.innerHTML = lyricsHTML;
        audioPlayer.play();
    } catch (error) {
        console.error("Error loading lyrics:", error);
        lyricsContainer.innerHTML = "<p>Could not load lyrics.</p>";
    }
}

// Next Song Button
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Previous Song Button
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Load first song on page load
window.onload = () => {
    loadSong(currentSongIndex);
};