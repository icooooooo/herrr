document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const flower = document.getElementById("music-toggle");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const title = document.getElementById("song-title");

  if (!music || !flower) return;

  const playlist = [
    { title: "End – Dream Protocol", src: "End.mp3" },
    { title: "Moon River – VGM Mark H", src: "Moon River.mp3" },
    { title: "She’s Mine – J. Cole", src: "Shes Mine.mp3" },
    { title: "Congratulations – Mac Miller", src: "Congratulations.mp3" },
    { title: "Weak For Your Love – The Sacred Souls", src: "Weak For Your Love.mp3" }
  ];

  let currentTrack = 0;
  let isPlaying = false;

  function loadTrack(index) {
    const track = playlist[index];
    music.src = track.src;
    if (title) title.textContent = track.title;
  }

  function togglePlay() {
    if (isPlaying) {
      music.pause();
      flower.classList.add("paused");
      if (playPauseBtn) playPauseBtn.textContent = "▶️";
    } else {
      music.play();
      flower.classList.remove("paused");
      if (playPauseBtn) playPauseBtn.textContent = "⏸️";
    }
    isPlaying = !isPlaying;
  }

  flower.addEventListener("click", togglePlay);
  if (playPauseBtn) playPauseBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) music.play();
  });
  if (prevBtn) prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) music.play();
  });

  loadTrack(currentTrack);
});