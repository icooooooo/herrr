// const messages = [
//   "Jour 1 : Tu lis ceci, donc tu es là. C’est déjà tout ce qu’il faut.",
//   "Jour 2 : Il y a des silences qui te ressemblent.",
//   "Jour 3 : Je n’ai pas besoin de te voir pour penser à toi.",
//   "Jour 4 : Encore là ? Moi aussi.",
//   "Jour 5 : Tu es mon heure préférée de la journée.",
//   "Jour 6 : Ce site, c’est un peu comme toi. Il change doucement.",
//   "Jour 7 : Peut-être que c’est de l’amour. Peut-être que c’est plus."
// ];

// const startDate = new Date("2025-07-12");
// const today = new Date();
// const diffTime = today - startDate;
// const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// const messageBox = document.getElementById("daily-message");
// if (messageBox) {
//   if (dayIndex < messages.length) {
//     messageBox.textContent = messages[dayIndex];
//   } else {
//     messageBox.textContent = "Tous les messages ont été révélés… ou presque ✨";
//   }
// }

// // ======================
// // 📝 Verses (Poèmes)
// // ======================
// const initialVerses = [
//   "You leave silence even inside the words.",
//   "I searched for a softer word than 'missing'. I found: 'you'."
// ];

// const verseList = document.getElementById("verse-list");
// const verseForm = document.getElementById("verse-form");
// const verseInput = document.getElementById("verse-input");

// let verses = JSON.parse(localStorage.getItem("verses")) || initialVerses;

// function renderVerses() {
//   if (!verseList) return;
//   verseList.innerHTML = "";
//   verses.forEach((v) => {
//     const li = document.createElement("li");
//     li.textContent = `"${v}"`;
//     verseList.appendChild(li);
//   });
// }

// if (verseForm && verseInput && verseList) {
//   verseForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const newVerse = verseInput.value.trim();
//     if (newVerse !== "") {
//       verses.unshift(newVerse);
//       localStorage.setItem("verses", JSON.stringify(verses));
//       verseInput.value = "";
//       renderVerses();
//     }
//   });
//   renderVerses();
// }

// // ======================
// // 🌸 Music Player
// // ======================
// document.addEventListener("DOMContentLoaded", () => {
//   const music = document.getElementById("bg-music");
//   const flower = document.getElementById("music-toggle");
//   const playPauseBtn = document.getElementById("play-pause");
//   const prevBtn = document.getElementById("prev");
//   const nextBtn = document.getElementById("next");
//   const title = document.getElementById("song-title");

//   if (!music || !flower) return;

//   const playlist = [
//     { title: "End – Dream Protocol", src: "End.mp3" },
//     { title: "Moon River – VGM Mark H", src: "Moon River.mp3" },
//     { title: "She’s Mine – J. Cole", src: "Shes Mine.mp3" },
//     { title: "Congratulations – Mac Miller", src: "Congratulations.mp3" },
//     { title: "Weak For Your Love – The Sacred Souls", src: "Weak For Your Love.mp3" }
//   ];

//   let currentTrack = 0;
//   let isPlaying = false;

//   function loadTrack(index) {
//     const track = playlist[index];
//     music.src = track.src;
//     if (title) title.textContent = track.title;
//   }

//   function togglePlay() {
//     if (isPlaying) {
//       music.pause();
//       flower.classList.add("paused");
//       if (playPauseBtn) playPauseBtn.textContent = "▶️";
//     } else {
//       music.play();
//       flower.classList.remove("paused");
//       if (playPauseBtn) playPauseBtn.textContent = "⏸️";
//     }
//     isPlaying = !isPlaying;
//   }

//   flower.addEventListener("click", togglePlay);
//   if (playPauseBtn) playPauseBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
//   if (nextBtn) nextBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     currentTrack = (currentTrack + 1) % playlist.length;
//     loadTrack(currentTrack);
//     if (isPlaying) music.play();
//   });
//   if (prevBtn) prevBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
//     loadTrack(currentTrack);
//     if (isPlaying) music.play();
//   });

//   loadTrack(currentTrack);
// });

// // ======================
// // 🌺 Floating Flowers + Mood Themes
// // ======================
// const themes = {
//  " Hungry": { bg: "#d0d0ff", flowers: ["👹","🧌","🍓","🥒","👹","🧌","🍓","🥒"] },
//   "A_feeling_ma_endoch_smiya": { bg: "#fffbe6", flowers: ["🩷","🩰","🪷","💐","🌷","🦢","🐇","🌷","💘"] },
//   "Mad": { bg: "#ffe0e0", flowers: ["🤐","💔","🤐","💔","🤐","💔","🤐","💔"] },
//   "Joy": { bg: "#e0f7ff", flowers: ["🤩","🤪,","😛","🤩","🤪,","😛","🤩","🤪,","😛"] },
//   "Overstimulated": { bg: "#f4f4f4", flowers: ["😀","😃","😀","😃","😀","😃","😀","😃"] },
//   "Blushing": { bg: "#ffe6f0", flowers: ["🪷","💐","💘","💕","🦢","🥰","🪷","💐","💘","💕","🦢","🥰"] },
//   "Hyper_excited": {
//     bg: "#fff0f5", // rose pâle vif
//     flowers: ["🐦‍🔥", "🐦‍🔥", "🧨", "🧨", "🎇", "🎇", "🎇", "🎇", "🎇", "🤩", "🤩", "🤩", "🤩"]
//   },
//   "Angryyy": {
//     bg: "#ffcccc", // rouge pâle
//     flowers: ["😡", "🥺", "😢", "🤨", "🩴","😡", "🥺", "😢", "🤨", "🩴","😡", "🥺", "😢", "🤨", "🩴"]
//   },
//  "Sad": {
//     bg: "#dfe6e9", // gris-bleu pâle
//     flowers: ["👻", "👻", "👻", "👻","👻", "👻", "👻", "👻","👻", "👻", "👻", "👻"] // "i disappear" style
//   },
//   "Tired": {
//     bg: "#b2bec3", // gris fatigué
//     flowers: ["🫵🏻", "🙅🏻‍♀", "🗣","🫵🏻", "🙅🏻‍♀", "🗣","🫵🏻", "🙅🏻‍♀", "🗣","🫵🏻", "🙅🏻‍♀", "🗣"]
//   },
//   "Sleepy": {
//     bg: "#d1d8e0", // bleu nuit doux
//     flowers: ["😴", "💤", "😵‍💫", "💫", "🥱", "🤤"] // interprété comme "nonsense"
//   },
//   "Love": {
//     bg: "#ffe6f0", // romantique
//     flowers: ["💕", "🩴", "🥰", "💐", "🤩", "🤩", "🐇", "🎁", "🥰", "🥰", "🥰", "🥰", "🙅🏻‍♀", "😡"]
//   }
// };

// let currentTheme = themes["Joy"];
// document.body.style.backgroundColor = currentTheme.bg;

// function applyTheme(mood) {
//   if (themes[mood]) {
//     currentTheme = themes[mood];
//     document.body.style.backgroundColor = currentTheme.bg;
//   }
// }

// function spawnFlower() {
//   const container = document.getElementById("flower-container");
//   if (!container) return;

//   const flower = document.createElement("div");
//   flower.classList.add("flower-float");

//   const emojis = currentTheme.flowers;
//   flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];

//   flower.style.left = Math.random() * 100 + "vw";
//   flower.style.bottom = "-50px";
//   flower.style.fontSize = 20 + Math.random() * 20 + "px";
//   flower.style.animationDuration = 5 + Math.random() * 5 + "s";

//   container.appendChild(flower);
//   setTimeout(() => container.removeChild(flower), 10000);
// }

// setInterval(spawnFlower, 500);

// // ======================
// // 🌈 Mood Selector (Popup)
// // ======================
// document.addEventListener("DOMContentLoaded", () => {
//   const popup = document.getElementById("mood-popup");
//   const buttons = popup?.querySelectorAll("button[data-mood]");

//   if (popup && buttons) {
//     popup.style.display = "flex";

//     buttons.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         const mood = btn.dataset.mood;
//         applyTheme(mood);
//         popup.style.display = "none";
//         localStorage.setItem("selectedMood", mood);
//       });
//     });
//   }

//   const savedMood = localStorage.getItem("selectedMood");
//   if (savedMood && themes[savedMood]) {
//     applyTheme(savedMood);
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const toggleBtn = document.getElementById("menu-toggle");
//   const navbar = document.getElementById("mobile-navbar");

//   if (toggleBtn && navbar) {
//     toggleBtn.addEventListener("click", () => {
//       navbar.classList.toggle("hidden");
//     });
//   }
// });