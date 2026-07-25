const express = require("express");
const path    = require("path");
const multer  = require("multer");
const fs      = require("fs");
const { getLicenses, createLicense, deleteLicense } = require("../controllers/licenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "../../uploads/business");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const ts = Date.now();
    cb(null, `license-${ts}${ext}`);
  },
});
const fileFilter = (_req, file, cb) => {
  const allowed = [
    "image/jpeg", "image/png", "image/webp", "image/jpg",
    "application/pdf",
  ];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only PDF/JPEG/PNG/WEBP allowed"), false);
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

router.get("/",       getLicenses);
router.post("/",      protect, upload.single("file"), createLicense);
router.delete("/:id", protect, deleteLicense);

module.exports = router;
