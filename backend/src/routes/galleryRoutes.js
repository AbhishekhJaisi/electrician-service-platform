const express = require("express");
const path    = require("path");
const multer  = require("multer");
const router  = express.Router();

const GalleryController = require("../controllers/galleryController");
const { protect }       = require("../middleware/authMiddleware");

// Store uploads in /uploads/gallery, keep original extension
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "../../uploads/gallery");
    require("fs").mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WEBP or GIF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5 MB

// Public
router.get("/gallery", GalleryController.getAll);

// Admin
router.post("/admin/gallery", protect, upload.single("image"), GalleryController.upload);
router.delete("/admin/gallery/:id", protect, GalleryController.remove);

module.exports = router;
