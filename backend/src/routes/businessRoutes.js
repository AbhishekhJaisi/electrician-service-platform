const express    = require("express");
const multer     = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../lib/cloudinary");
const { getBusiness, updateBusiness, uploadOwnerPhoto } = require("../controllers/businessController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Store owner photo directly in Cloudinary under the "business" folder
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          "business",
    public_id:       () => "owner",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    overwrite:       true,
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only JPEG/PNG/WEBP allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/",       getBusiness);
router.put("/",       protect, updateBusiness);
router.post("/photo", protect, upload.single("photo"), uploadOwnerPhoto);

module.exports = router;
