const express = require("express");
const path    = require("path");
const multer  = require("multer");
const fs      = require("fs");
const { getBusiness, updateBusiness, uploadOwnerPhoto } = require("../controllers/businessController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer for owner photo
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "../../uploads/business");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `owner${ext}`); // always overwrite — only one owner photo
  },
});
const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only JPEG/PNG/WEBP allowed"), false);
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/",      getBusiness);
router.put("/",      protect, updateBusiness);
router.post("/photo", protect, upload.single("photo"), uploadOwnerPhoto);

module.exports = router;
