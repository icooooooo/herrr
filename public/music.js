document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SELECT ALL ELEMENTS ---
  const music = document.getElementById("bg-music");
  const flower = document.getElementById("music-toggle");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const title = document.getElementById("song-title");
  
  // Elements for the playlist functionality
  const playlistContainer = document.getElementById('playlist-container');
  const playlistList = document.getElementById('playlist-list');

  // If any of the essential elements are missing, stop the script.
  if (!music || !flower || !playlistContainer || !playlistList) {
    console.error("Music player element(s) not found on this page.");
    return;
  }

  // --- 2. YOUR COMPLETE PLAYLIST ---
  const playlist = [
    { title: "End – Dream Protocol", src: "/musics/End.mp3" },
    { title: "Moon River – VGM Mark H", src: "/musics/Moon River.mp3" },
    { title: "She's Mine – J. Cole", src: "/musics/Shes Mine.mp3" },
    { title: "2 + 2 = 5 – Radiohead", src: "/musics/Radiohead - 2 + 2 = 5.mp3" },
    { title: "Bodysnatchers – Radiohead", src: "/musics/Radiohead - Bodysnatchers.mp3" },
    { title: "House Of Cards – Radiohead", src: "/musics/Radiohead - House Of Cards.mp3" },
    { title: "Knives Out – Radiohead", src: "/musics/Radiohead - Knives Out.mp3" },
    { title: "Polyethylene (Parts 1 & 2) – Radiohead", src: "/musics/Radiohead - Polyethylene (Parts 1 & 2).mp3" },
    { title: "The National Anthem – Radiohead", src: "/musics/Radiohead - The National Anthem.mp3" },
    { title: "True Love Waits – Radiohead", src: "/musics/Radiohead - True Love Waits.mp3" },
    { title: "How I Made My Millions – Radiohead", src: "/musics/Radiohead - How I Made My Millions.mp3" },
    { title: "How to Disappear Completely – Radiohead", src: "/musics/Radiohead - How to Disappear Completely.mp3" },
    { title: "I Might Be Wrong – Radiohead", src: "/musics/Radiohead - I Might Be Wrong.mp3" },
    { title: "Jigsaw Falling Into Place – Radiohead", src: "/musics/Radiohead - Jigsaw Falling Into Place.mp3" },
    { title: "Lotus Flower – Radiohead", src: "/musics/Radiohead - Lotus Flower.mp3" },
    { title: "Melatonin – Radiohead", src: "/musics/Radiohead - Melatonin.mp3" },
    { title: "There, There – Radiohead", src: "/musics/Radiohead - There, There.mp3" },
    { title: "Untitled – Radiohead", src: "/musics/Radiohead - Untitled.mp3" },
    { title: "A Reminder – Radiohead", src: "/musics/Radiohead - A Reminder.mp3" },
    { title: "A Wolf At the Door – Radiohead", src: "/musics/Radiohead - A Wolf At the Door.mp3" },
    { title: "Idioteque – Radiohead", src: "/musics/Radiohead - Idioteque.mp3" },
    { title: "Kid A – Radiohead", src: "/musics/Radiohead - Kid A.mp3" },
    { title: "Nude – Radiohead", src: "/musics/Radiohead - Nude.mp3" },
    { title: "Optimistic – Radiohead", src: "/musics/Radiohead - Optimistic.mp3" },
    { title: "Weird Fishes _ Arpeggi – Radiohead", src: "/musics/Radiohead - Weird Fishes _ Arpeggi.mp3" },
    { title: "Daydreaming – Radiohead", src: "/musics/Radiohead - Daydreaming.mp3" },
    { title: "Faust Arp – Radiohead", src: "/musics/Radiohead - Faust Arp.mp3" },
    { title: "In Limbo – Radiohead", src: "/musics/Radiohead - In Limbo.mp3" },
    { title: "Meeting in the Aisle – Radiohead", src: "/musics/Radiohead - Meeting in the Aisle.mp3" },
    { title: "Morning Bell – Radiohead", src: "/musics/Radiohead - Morning Bell.mp3" },
    { title: "Palo Alto – Radiohead", src: "/musics/Radiohead - Palo Alto.mp3" },
    { title: "Reckoner – Radiohead", src: "/musics/Radiohead - Reckoner.mp3" },
    { title: "Sit Down. Stand Up – Radiohead", src: "/musics/Radiohead - Sit Down. Stand Up.mp3" },
    { title: "You And Whose Army_ – Radiohead", src: "/musics/Radiohead - You And Whose Army_.mp3" },
    { title: "15 Step – Radiohead", src: "/musics/Radiohead - 15 Step.mp3" },
    { title: "All I Need – Radiohead", src: "/musics/Radiohead - All I Need.mp3" },
    { title: "Burn the Witch – Radiohead", src: "/musics/Radiohead - Burn the Witch.mp3" },
    { title: "Everything In Its Right Place – Radiohead", src: "/musics/Radiohead - Everything In Its Right Place.mp3" },
    { title: "Lull – Radiohead", src: "/musics/Radiohead - Lull.mp3" },
    { title: "Motion Picture Soundtrack – Radiohead", src: "/musics/Radiohead - Motion Picture Soundtrack.mp3" },
    { title: "Pearly_ – Radiohead", src: "/musics/Radiohead - Pearly_.mp3" },
    { title: "Pyramid Song – Radiohead", src: "/musics/Radiohead - Pyramid Song.mp3" },
    { title: "Treefingers – Radiohead", src: "/musics/Radiohead - Treefingers.mp3" },
    { title: "Videotape – Radiohead", src: "/musics/Radiohead - Videotape.mp3" },
    { title: "Lift – Radiohead", src: "/musics/Radiohead - Lift.mp3" },
    { title: "Man of War – Radiohead", src: "/musics/Radiohead - Man of War.mp3" },
    { title: "I Promise – Radiohead", src: "/musics/Radiohead - I Promise.mp3" },
    { title: "The Tourist – Radiohead", src: "/musics/Radiohead - The Tourist.mp3" },
    { title: "Lucky – Radiohead", src: "/musics/Radiohead - Lucky.mp3" },
    { title: "Climbing Up the Walls – Radiohead", src: "/musics/Radiohead - Climbing Up the Walls.mp3" },
    { title: "Let Down – Radiohead", src: "/musics/Radiohead - Let Down.mp3" },
    { title: "Electioneering – Radiohead", src: "/musics/Radiohead - Electioneering.mp3" },
    { title: "Fitter Happier – Radiohead", src: "/musics/Radiohead - Fitter Happier.mp3" },
    { title: "Subterranean Homesick Alien – Radiohead", src: "/musics/Radiohead - Subterranean Homesick Alien.mp3" },
    { title: "Airbag – Radiohead", src: "/musics/Radiohead - Airbag.mp3" },
    { title: "Exit Music (For A Film) – Radiohead", src: "/musics/Radiohead - Exit Music (For A Film).mp3" },
    { title: "Just – Radiohead", src: "/musics/Radiohead - Just.mp3" },
    { title: "No Surprises – Radiohead", src: "/musics/Radiohead - No Surprises.mp3" },
    { title: "Street Spirit (Fade Out) – Radiohead", src: "/musics/Radiohead - Street Spirit (Fade Out).mp3" },
    { title: "(Nice Dream) – Radiohead", src: "/musics/Radiohead - (Nice Dream).mp3" },
    { title: "Anyone Can Play Guitar – Radiohead", src: "/musics/Radiohead - Anyone Can Play Guitar.mp3" },
    { title: "Black Star – Radiohead", src: "/musics/Radiohead - Black Star.mp3" },
    { title: "Bones – Radiohead", src: "/musics/Radiohead - Bones.mp3" },
    { title: "Bullet Proof ... I Wish I Was – Radiohead", src: "/musics/Radiohead - Bullet Proof ... I Wish I Was.mp3" },
    { title: "Creep – Radiohead", src: "/musics/Radiohead - Creep.mp3" },
    { title: "Fake Plastic Trees – Radiohead", src: "/musics/Radiohead - Fake Plastic Trees.mp3" },
    { title: "High and Dry – Radiohead", src: "/musics/Radiohead - High and Dry.mp3" },
    { title: "Karma Police – Radiohead", src: "/musics/Radiohead - Karma Police.mp3" },
    { title: "My Iron Lung – Radiohead", src: "/musics/Radiohead - My Iron Lung.mp3" },
    { title: "Paranoid Android – Radiohead", src: "/musics/Radiohead - Paranoid Android.mp3" },
    { title: "Planet Telex – Radiohead", src: "/musics/Radiohead - Planet Telex.mp3" },
    { title: "Sulk – Radiohead", src: "/musics/Radiohead - Sulk.mp3" },
    { title: "The Bends – Radiohead", src: "/musics/Radiohead - The Bends.mp3" },
    { title: "You – Radiohead", src: "/musics/Radiohead - You.mp3" }
  ];

  let currentTrack = 0;
  let isPlaylistOpen = false;
  
  // --- 3. CORE MUSIC FUNCTIONS ---
  
  function loadTrack(index) {
    currentTrack = index;
    const track = playlist[index];
    music.src = track.src;
    if (title) title.textContent = track.title;
    highlightCurrentSongInPlaylist();
  }

  function playMusic() {
    flower.classList.remove("paused");
    if (playPauseBtn) playPauseBtn.textContent = "⏸️";
    music.play().catch(err => console.log("Play error:", err));
  }

  function pauseMusic() {
    flower.classList.add("paused");
    if (playPauseBtn) playPauseBtn.textContent = "▶️";
    music.pause();
  }
  
  function togglePlay() {
    if (music.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  function nextTrack() {
    const nextIndex = (currentTrack + 1) % playlist.length;
    loadTrack(nextIndex);
    playMusic();
  }
  
  function prevTrack() {
    const prevIndex = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex);
    playMusic();
  }

  // Fonction pour ouvrir/fermer la playlist
  function togglePlaylist() {
    playlistContainer.classList.toggle('hidden');
    isPlaylistOpen = !isPlaylistOpen;
  }
  
  // --- 4. PLAYLIST DISPLAY FUNCTIONS ---

  function generatePlaylist() {
    playlistList.innerHTML = '';
    playlist.forEach((song, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'playlist-item';
      
      // Extraire titre et artiste
      const parts = song.title.split(' – ');
      const songTitle = parts[0];
      const artist = parts[1] || '';
      
      listItem.innerHTML = `
        <span class="song-icon">🎵</span>
        <div class="song-info">
          <span class="song-title">${songTitle}</span>
          ${artist ? `<span class="song-artist">${artist}</span>` : ''}
        </div>
      `;
      
      listItem.dataset.index = index;
      playlistList.appendChild(listItem);
    });
  }

  function highlightCurrentSongInPlaylist() {
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
      if (index === currentTrack) {
        item.classList.add('active');
        item.querySelector('.song-icon').textContent = '▶️';
      } else {
        item.classList.remove('active');
        item.querySelector('.song-icon').textContent = '🎵';
      }
    });
  }

  // --- 5. EVENT LISTENERS ---

  // Clic sur la fleur : clic court = toggle playlist, clic long = play/pause
  let pressTimer;
  let isLongPress = false;

  flower.addEventListener("mousedown", (e) => {
    isLongPress = false;
    pressTimer = setTimeout(() => {
      isLongPress = true;
    }, 200); // 200ms pour distinguer clic court vs long
  });

  flower.addEventListener("mouseup", (e) => {
    clearTimeout(pressTimer);
    if (!isLongPress) {
      // Clic court = ouvrir/fermer la playlist
      togglePlaylist();
    } else {
      // Clic long = play/pause
      togglePlay();
    }
  });

  flower.addEventListener("mouseleave", () => {
    clearTimeout(pressTimer);
  });

  // Pour mobile (touch events)
  flower.addEventListener("touchstart", (e) => {
    isLongPress = false;
    pressTimer = setTimeout(() => {
      isLongPress = true;
    }, 200);
  });

  flower.addEventListener("touchend", (e) => {
    clearTimeout(pressTimer);
    if (!isLongPress) {
      togglePlaylist();
    } else {
      togglePlay();
    }
  });
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      togglePlay(); 
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      nextTrack(); 
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      prevTrack(); 
    });
  }
  
  music.addEventListener('ended', nextTrack);

  // Clic sur une chanson dans la playlist
  playlistList.addEventListener('click', (e) => {
    const playlistItem = e.target.closest('.playlist-item');
    if (playlistItem) {
      const clickedIndex = parseInt(playlistItem.dataset.index);
      loadTrack(clickedIndex);
      playMusic();
      // Fermer la playlist après sélection
      playlistContainer.classList.add('hidden');
      isPlaylistOpen = false;
    }
  });

  // Fermer la playlist en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (!playlistContainer.contains(e.target) && 
        !flower.contains(e.target) &&
        !playlistContainer.classList.contains('hidden')) {
      playlistContainer.classList.add('hidden');
      isPlaylistOpen = false;
    }
  });

  // --- 6. INITIALIZE ---
  generatePlaylist();
  loadTrack(currentTrack);
});