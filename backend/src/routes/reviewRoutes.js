const express = require("express");
const { getAllReviews, getAllReviewsAdmin, getReviewById, createReview, submitPublicReview, updateReview, toggleReviewActive, deleteReview, reviewValidation } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",            getAllReviews);
router.get("/admin/all",   protect, getAllReviewsAdmin);
router.get("/:id",         getReviewById);
router.post("/",           protect, createReview);
router.post("/public",     reviewValidation, submitPublicReview);
router.put("/:id",         protect, updateReview);
router.patch("/:id/toggle", protect, toggleReviewActive);
router.delete("/:id",      protect, deleteReview);

module.exports = router;
