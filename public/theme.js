document.addEventListener("DOMContentLoaded", () => {
  const themes = {
    "Hungry": { bg: "#d0d0ff", flowers: ["👹","🧌","🍓","🥒"] },
    "A_feeling_ma_endoch_smiya": { bg: "#fffbe6", flowers: ["🩷","🩰","🪷","💐","🌷","🦢","🐇","💘"] },
    "Mad": { bg: "#ffe0e0", flowers: ["🤐","💔"] },
    "Joy": { bg: "#e0f7ff", flowers: ["🤩","🤪","😛"] },
    "Overstimulated": { bg: "#f4f4f4", flowers: ["😀","😃"] },
    "Blushing": { bg: "#ffe6f0", flowers: ["🪷","💐","💘","💕","🦢","🥰"] },
    "Hyper_excited": { bg: "#fff0f5", flowers: ["🐦‍🔥","🧨","🎇","🤩"] },
    "Angryyy": { bg: "#ffcccc", flowers: ["😡", "🥺", "😢", "🤨", "🩴"] },
    "Sad": { bg: "#dfe6e9", flowers: ["👻"] },
    "Tired": { bg: "#b2bec3", flowers: ["🫵🏻", "🙅🏻‍♀", "🗣"] },
    "Sleepy": { bg: "#d1d8e0", flowers: ["😴", "💤", "😵‍💫", "💫", "🥱", "🤤"] },
    "Love": { bg: "#ffe6f0", flowers: ["💕", "🩴", "🥰", "💐", "🤩", "🐇", "🎁", "🙅🏻‍♀", "😡"] }
  };

  let currentTheme = themes["Joy"];
  document.body.style.backgroundColor = currentTheme.bg;

  function applyTheme(mood) {
    if (themes[mood]) {
      currentTheme = themes[mood];
      document.body.style.backgroundColor = currentTheme.bg;
    }
  }

  function spawnFlower() {
    const container = document.getElementById("flower-container");
    if (!container) return;
    const flower = document.createElement("div");
    flower.classList.add("flower-float");
    flower.textContent = currentTheme.flowers[Math.floor(Math.random() * currentTheme.flowers.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.bottom = "-50px";
    flower.style.fontSize = 20 + Math.random() * 20 + "px";
    flower.style.animationDuration = 5 + Math.random() * 5 + "s";
    container.appendChild(flower);
    setTimeout(() => container.removeChild(flower), 10000);
  }

  setInterval(spawnFlower, 500);

  const popup = document.getElementById("mood-popup");
  const buttons = popup?.querySelectorAll("button[data-mood]");
  if (popup && buttons) {
    popup.style.display = "flex";
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mood = btn.dataset.mood;
        applyTheme(mood);
        popup.style.display = "none";
        localStorage.setItem("selectedMood", mood);
      });
    });
  }

  const savedMood = localStorage.getItem("selectedMood");
  if (savedMood && themes[savedMood]) {
    applyTheme(savedMood);
  }
});