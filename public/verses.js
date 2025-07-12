document.addEventListener("DOMContentLoaded", () => {
      const verseForm = document.getElementById("verse-form");
      const verseInput = document.getElementById("verse-input");
      const versesList = document.getElementById("verses-list");

      let verses = JSON.parse(localStorage.getItem("verses")) || [];

      function saveVerses() {
        localStorage.setItem("verses", JSON.stringify(verses));
      }

      function renderVerses() {
        versesList.innerHTML = "";
        verses.forEach((verse) => {
          const div = document.createElement("div");
          div.classList.add("verse-card");

          div.innerHTML = `
            <p>${verse.text}</p>
            <small>🕰️ Added on ${verse.date}</small>
          `;
          versesList.appendChild(div);
        });
      }

      verseForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newVerse = verseInput.value.trim();
        if (newVerse !== "") {
          const today = new Date();
          const formattedDate = today.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          verses.unshift({
            text: newVerse,
            date: formattedDate
          });

          saveVerses();
          verseInput.value = "";
          renderVerses();
        }
      });

      renderVerses();
    });