// script.js
// Music Player Configuration
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

// Player State Management
let currentSongIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.querySelector(".songlyrics");

// Song Loading System
async function loadSong(index) {
    try {
        const song = songs[index];

        // Validate song object
        if (!song || !song.title || !song.src || !song.lyricsFile) {
            throw new Error("Invalid song configuration");
        }

        // Update audio source
        audioPlayer.src = song.src;
        console.log(`🎶 Loading audio: ${song.src}`);

        // Parse song title and artist
        const separatorIndex = song.title.lastIndexOf(" - ");
        if (separatorIndex === -1) {
            throw new Error("Invalid title format. Use 'Song Name - Artist' format");
        }

        const songName = song.title.substring(0, separatorIndex);
        const artist = song.title.substring(separatorIndex + 3);

        // Update header information
        document.getElementById("songTitle").textContent = `❤️ ${songName} ❤️`;
        document.getElementById("songArtist").textContent = `by: ${artist}`;
        console.log(`📢 Now playing: ${songName} by ${artist}`);

        // Load lyrics
        const response = await fetch(song.lyricsFile);
        if (!response.ok) {
            throw new Error(`Lyrics not found (HTTP ${response.status})`);
        }

        const lyricsHTML = await response.text();
        lyricsContainer.innerHTML = lyricsHTML;
        console.log("📜 Lyrics loaded successfully");

        // Auto-play with error handling
        audioPlayer.play().catch(error => {
            console.warn("Autoplay blocked:", error);
            alert("Click anywhere on the page to start playback!");
        });

    } catch (error) {
        console.error("🚨 Song loading error:", error);
        lyricsContainer.innerHTML = `
            <p style="color: #ff0000">
                ❤️🔥 Error loading song: ${error.message}
            </p>
        `;
    }
}

// Playback Controls
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    console.log("⏭ Next song triggered");
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    console.log("⏮ Previous song triggered");
    loadSong(currentSongIndex);
}

// Initialize player with first song
window.addEventListener('load', () => {
    console.log("💖 Player initialized");
    loadSong(currentSongIndex).catch(error => {
        console.error("Initialization failed:", error);
    });
});

// Add click handler for autoplay unlock
document.body.addEventListener('click', () => {
    audioPlayer.play().catch(error => {
        console.log("Playback still blocked");
    });
});