const express    = require("express");
const multer     = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../lib/cloudinary");
const router     = express.Router();

const GalleryController = require("../controllers/galleryController");
const { protect }       = require("../middleware/authMiddleware");

// Store uploads directly in Cloudinary under the "gallery" folder
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          "gallery",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
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
router.post("/admin/gallery",      protect, upload.single("image"), GalleryController.upload);
router.delete("/admin/gallery/:id", protect, GalleryController.remove);

module.exports = router;
