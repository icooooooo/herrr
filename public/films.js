const filmsList = document.getElementById("films-list");
const addFilmForm = document.getElementById("add-film-form");

const modal = document.getElementById("film-detail-modal");
const closeDetailBtn = document.getElementById("close-detail");

const detailName = document.getElementById("detail-film-name");
const detailCover = document.getElementById("detail-film-cover");
const detailReleaseDate = document.getElementById("detail-release-date");
const detailWatchedDate = document.getElementById("detail-watched-date");
const detailSuggestedBy = document.getElementById("detail-suggested-by");

const myMarkInput = document.getElementById("my-mark");
const myReviewText = document.getElementById("my-review-text");
const myReviewSubmit = document.getElementById("my-review-submit");
const myReviewDisplay = document.getElementById("my-review-display");

const herMarkInput = document.getElementById("her-mark");
const herReviewText = document.getElementById("her-review-text");
const herReviewSubmit = document.getElementById("her-review-submit");
const herReviewDisplay = document.getElementById("her-review-display");

let films = [];

// Charger les films depuis le backend
function fetchFilms() {
  fetch("/api/films")
    .then((res) => res.json())
    .then((data) => {
      films = data;
      renderFilms();
    })
    .catch((err) => console.error("Erreur chargement films:", err));
}

// Sauvegarder un film (ajout ou update)
function saveFilm(film) {
  fetch("/api/films", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(film)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        fetchFilms();
      } else {
        alert("Erreur lors de la sauvegarde.");
      }
    })
    .catch((err) => console.error("Erreur sauvegarde:", err));
}

// Affichage de la liste
function renderFilms() {
  filmsList.innerHTML = "";
  films.forEach((film, index) => {
    const li = document.createElement("li");
    li.textContent = film.name;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => openFilmDetail(index));
    filmsList.appendChild(li);
  });
}

// Ouvrir les détails du film
function openFilmDetail(index) {
  const film = films[index];
  modal.classList.remove("hidden");

  detailName.textContent = film.name;
  detailReleaseDate.textContent = film.releaseDate;
  detailWatchedDate.textContent = film.watchedDate;
  detailSuggestedBy.textContent = film.suggestedBy;
  detailCover.src = film.cover || "https://via.placeholder.com/200x300?text=No+Cover";

  myMarkInput.value = film.myReview?.mark ?? "";
  myReviewText.value = film.myReview?.text ?? "";
  herMarkInput.value = film.herReview?.mark ?? "";
  herReviewText.value = film.herReview?.text ?? "";

  modal.dataset.currentIndex = index;

  displayReviews();
}

// Fermer le modal
closeDetailBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Affichage des reviews
function displayReviews() {
  const index = modal.dataset.currentIndex;
  if (index === undefined) return;
  const film = films[index];

  myReviewDisplay.textContent = film.myReview?.text
    ? `Mark: ${film.myReview.mark} / 10\nReview: ${film.myReview.text}`
    : "No review yet.";

  herReviewDisplay.textContent = film.herReview?.text
    ? `Mark: ${film.herReview.mark} / 10\nReview: ${film.herReview.text}`
    : "No review yet.";
}

// Envoi review "My"
myReviewSubmit.addEventListener("click", () => {
  const index = modal.dataset.currentIndex;
  if (index === undefined) return;

  const mark = parseInt(myMarkInput.value);
  const text = myReviewText.value.trim();

  if (isNaN(mark) || mark < 0 || mark > 10) {
    alert("Please enter a valid mark between 0 and 10.");
    return;
  }
  if (!text) {
    alert("Please write a review.");
    return;
  }

  films[index].myReview = { mark, text };
  saveFilm(films[index]);
  displayReviews();
  alert("Your review has been saved!");
});

// Envoi review "Her"
herReviewSubmit.addEventListener("click", () => {
  const index = modal.dataset.currentIndex;
  if (index === undefined) return;

  const mark = parseInt(herMarkInput.value);
  const text = herReviewText.value.trim();

  if (isNaN(mark) || mark < 0 || mark > 10) {
    alert("Please enter a valid mark between 0 and 10.");
    return;
  }
  if (!text) {
    alert("Please write a review.");
    return;
  }

  films[index].herReview = { mark, text };
  saveFilm(films[index]);
  displayReviews();
  alert("Her review has been saved!");
});

// Ajouter un film
addFilmForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("film-name").value.trim();
  const releaseDate = document.getElementById("film-release-date").value;
  const suggestedBy = document.querySelector('input[name="film-suggested-by"]:checked')?.value;
  const watchedDate = document.getElementById("film-watched-date").value;
  const coverUrl = document.getElementById("film-cover-url").value.trim();
  const winner = document.querySelector('input[name="film-winner"]:checked')?.value;

  if (!name || !releaseDate || !suggestedBy || !watchedDate) {
    alert("Please fill all fields.");
    return;
  }

  const newFilm = {
    name,
    releaseDate,
    suggestedBy,
    watchedDate,
    myReview: null,
    herReview: null,
    winner,
    cover: coverUrl || ""
  };

  saveFilm(newFilm);
  addFilmForm.reset();
});

// Lancer chargement au démarrage
fetchFilms();