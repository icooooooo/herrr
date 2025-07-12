const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_PATH = path.join(__dirname, "data", "films.json");

// Middleware
app.use(express.json());
app.use(express.static("public")); // sert tes fichiers HTML, CSS, JS

// GET: récupérer tous les films
app.get("/api/films", (req, res) => {
  fs.readFile(DATA_PATH, "utf-8", (err, data) => {
    if (err) {
      console.error("Erreur lecture JSON:", err);
      return res.status(500).json({ error: "Unable to read films data." });
    }

    try {
      const films = JSON.parse(data);
      res.json(films);
    } catch (e) {
      console.error("Erreur parsing JSON:", e);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
});

// POST: ajouter ou mettre à jour un film
app.post("/api/films", (req, res) => {
  const newFilm = req.body;

  fs.readFile(DATA_PATH, "utf-8", (err, data) => {
    if (err) {
      console.error("Erreur lecture:", err);
      return res.status(500).json({ error: "Unable to read file." });
    }

    let films = [];
    try {
      films = JSON.parse(data);
    } catch (e) {
      console.error("Erreur parsing JSON:", e);
    }

    // Vérifie si le film existe déjà (par nom)
    const index = films.findIndex((f) => f.name === newFilm.name);

    if (index !== -1) {
      films[index] = newFilm; // mise à jour
    } else {
      films.unshift(newFilm); // ajout
    }

    fs.writeFile(DATA_PATH, JSON.stringify(films, null, 2), (err) => {
      if (err) {
        console.error("Erreur écriture JSON:", err);
        return res.status(500).json({ error: "Failed to save film." });
      }

      res.json({ success: true });
    });
  });
});
const ANSWERS_PATH = path.join(__dirname, "data", "answers.json");

app.post("/api/answers", (req, res) => {
  const newAnswer = req.body;

  fs.readFile(ANSWERS_PATH, "utf-8", (err, data) => {
    let answers = [];
    if (!err) {
      try {
        answers = JSON.parse(data);
      } catch (e) {
        console.error("Invalid JSON");
      }
    }

    answers.unshift(newAnswer);

    fs.writeFile(ANSWERS_PATH, JSON.stringify(answers, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Write failed." });
      res.json({ success: true });
    });
  });
});
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});