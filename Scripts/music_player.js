// CoderOS YouTube Music & Streaming Station Player

const ytPlayerFrame = document.querySelector("#ytPlayerFrame");
const musicPlayerTitle = document.querySelector("#musicPlayerSongTitle");
const musicPlayerChannel = document.querySelector("#musicPlayerChannel");
const playerStatusText = document.querySelector("#playerStatusText");
const equalizerBars = document.querySelector("#equalizerBars");
const customUrlInput = document.querySelector("#customMusicUrl");
const playCustomUrlBtn = document.querySelector("#playCustomUrlBtn");
const navTabs = document.querySelectorAll(".music_nav_tab");
const customUrlRow = document.querySelector("#customUrlRow");
const radioStationList = document.querySelector("#radioStationList");
const musicPlayerPlaylist = document.querySelector("#musicPlayerPlaylist");
const ytStreamContainer = document.querySelector("#ytStreamContainer");

let currentAudio = null;

// Navigation Tabs
if (navTabs) {
    navTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            navTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const mode = tab.dataset.tab;
            if (mode === "stream") {
                if (ytStreamContainer) ytStreamContainer.style.display = "block";
                if (customUrlRow) customUrlRow.style.display = "none";
                if (radioStationList) radioStationList.style.display = "flex";
                if (musicPlayerPlaylist) musicPlayerPlaylist.style.display = "none";
            } else if (mode === "custom") {
                if (ytStreamContainer) ytStreamContainer.style.display = "block";
                if (customUrlRow) customUrlRow.style.display = "flex";
                if (radioStationList) radioStationList.style.display = "none";
                if (musicPlayerPlaylist) musicPlayerPlaylist.style.display = "none";
            } else if (mode === "local") {
                if (ytStreamContainer) ytStreamContainer.style.display = "none";
                if (customUrlRow) customUrlRow.style.display = "none";
                if (radioStationList) radioStationList.style.display = "none";
                if (musicPlayerPlaylist) musicPlayerPlaylist.style.display = "flex";
            }
        });
    });
}

// Radio Station Cards
const stationCards = document.querySelectorAll(".radio_station_card");
if (stationCards) {
    stationCards.forEach(card => {
        card.addEventListener("click", () => {
            stationCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            const vid = card.dataset.vid;
            const title = card.dataset.title;
            const channel = card.dataset.channel;

            playYouTubeVideo(vid, title, channel);
        });
    });
}

function playYouTubeVideo(videoId, title, channel) {
    if (currentAudio) {
        currentAudio.pause();
    }

    if (ytPlayerFrame) {
        ytPlayerFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
    }

    if (musicPlayerTitle) musicPlayerTitle.textContent = title || "YouTube Stream";
    if (musicPlayerChannel) musicPlayerChannel.textContent = channel || "Live Audio Stream";
    if (playerStatusText) playerStatusText.textContent = "STREAMING";
    if (equalizerBars) equalizerBars.classList.add("eq_active");
}

function extractYouTubeID(url) {
    if (!url) return null;
    const trimmed = url.trim();
    if (trimmed.length === 11 && !trimmed.includes("/")) return trimmed;

    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|music\.youtube\.com\/watch\?v=)([^"&?\/\s]{11})/i;
    const match = trimmed.match(regExp);
    return match ? match[1] : null;
}

if (playCustomUrlBtn && customUrlInput) {
    playCustomUrlBtn.addEventListener("click", handleCustomPlay);
    customUrlInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCustomPlay();
    });
}

function handleCustomPlay() {
    const val = customUrlInput.value.trim();
    if (!val) return;
    const vid = extractYouTubeID(val);
    if (vid) {
        playYouTubeVideo(vid, "Custom YouTube Track", "User Stream");
        customUrlInput.value = "";
    } else {
        alert("Please enter a valid YouTube or YouTube Music URL or 11-character video ID.");
    }
}

// Local Audio Tracks support
const localTracks = [
    { title: "Bloody Stream", audioSrc: "Audio/Bloody_Stream.mp3", imgSrc: "Images/Bloody_Stream.jpg" },
    { title: "Canzoni Preferite", audioSrc: "Audio/Canzoni_Preferite.mp3", imgSrc: "Images/Canzoni_Preferite.jpg" },
    { title: "Hungarian Dance no.5", audioSrc: "Audio/Hungarian_Dance.mp3", imgSrc: "Images/Hungarian_Dance.jpg" }
];

function loadLocalTracks() {
    if (!musicPlayerPlaylist) return;
    musicPlayerPlaylist.innerHTML = "";
    localTracks.forEach((track, index) => {
        const row = document.createElement("div");
        row.className = "radio_station_card";
        row.style.margin = "4px 0";
        row.innerHTML = `
            <span class="radio_station_icon">🎵</span>
            <div class="radio_station_info">
                <div class="radio_station_name">${track.title}</div>
                <div class="radio_station_sub">Local Audio File</div>
            </div>
            <span class="radio_station_badge">MP3</span>
        `;
        row.addEventListener("click", () => {
            if (ytPlayerFrame) ytPlayerFrame.src = "";
            if (currentAudio) currentAudio.pause();
            currentAudio = new Audio(track.audioSrc);
            currentAudio.play().catch(() => {});
            if (musicPlayerTitle) musicPlayerTitle.textContent = track.title;
            if (musicPlayerChannel) musicPlayerChannel.textContent = "Local Workstation Audio";
            if (playerStatusText) playerStatusText.textContent = "PLAYING";
            if (equalizerBars) equalizerBars.classList.add("eq_active");
        });
        musicPlayerPlaylist.appendChild(row);
    });
}

loadLocalTracks();