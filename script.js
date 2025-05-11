const songs = [
    {
        title: "Always and Forever - Luther Vandross",
        src: "songs/luther-vandross-always-and-forever.mp3",
        lyricsFile: "lyrics/luther-vandross-always-and-forever.txt"
    },
    {
        title: "I Can't Stop Loving You - Kem",
        src: "songs/kem-cant-stop-lovin-you.mp3",
        lyricsFile: "lyrics/kem-cant-stop-lovin-you.txt"
    }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.querySelector(".songlyrics");

async function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;

    // Split title correctly
    const separatorIndex = song.title.lastIndexOf(" - ");
    const songName = song.title.substring(0, separatorIndex);
    const artist = song.title.substring(separatorIndex + 3);

    // Update header
    document.getElementById("songTitle").textContent = `❤️ ${songName} ❤️`;
    document.getElementById("songArtist").textContent = `by: ${artist}`;

    // Rest of the function remains the same...
}

    try {
        const response = await fetch(song.lyricsFile);
        const lyricsHTML = await response.text();
        lyricsContainer.innerHTML = lyricsHTML;
        audioPlayer.play();
    } catch (error) {
        console.error("Error loading lyrics:", error);
        lyricsContainer.innerHTML = "<p>Could not load lyrics. Please try again later.</p>";

}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Initialize first song
window.onload = () => loadSong(currentSongIndex);