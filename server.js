const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.static("public"));

// --- Folder Paths ---
const UPLOADS_DIR = path.join(__dirname, 'public/uploads/');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// --- Multer Configuration: Simple and Clean for Images ---
const storage = multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: function (req, file, cb) {
        // Create a unique filename: originalname-timestamp.ext
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
});

// A filter to ensure only images are uploaded
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter }).single('myImage');

// --- A VERY SIMPLE UPLOAD ROUTE ---
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error("Upload Error:", err);
            return res.status(400).json({ msg: err.message }); // Send a user-friendly error
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'No file was uploaded.' });
        }
        // Success!
        res.status(200).json({
            msg: 'Memory uploaded successfully!',
            file: `uploads/${req.file.filename}`
        });
    });
});

// GET Route for the gallery
app.get('/api/images', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) return res.status(500).send('Server error.');
        // Filter out non-image files just in case, and sort to show newest first
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|heic|heif)$/i.test(file));
        res.json(imageFiles.sort().reverse());
    });
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});