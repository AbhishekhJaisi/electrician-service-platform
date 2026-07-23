const ReviewModel = require("../models/reviewModel");
const { validationResult, body } = require("express-validator");

/** GET /api/reviews */
const getAllReviews = async (_req, res) => {
  const data = await ReviewModel.findAll();
  return res.json({ success: true, count: data.length, data });
};

/** GET /api/reviews/admin/all (protected) */
const getAllReviewsAdmin = async (_req, res) => {
  const data = await ReviewModel.findAllAdmin();
  return res.json({ success: true, count: data.length, data });
};

/** GET /api/reviews/:id */
const getReviewById = async (req, res) => {
  const review = await ReviewModel.findById(req.params.id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });
  return res.json({ success: true, data: review });
};

/** POST /api/reviews  (protected) */
const createReview = async (req, res) => {
  const { name, area, rating, text, date, avatar } = req.body;
  const review = await ReviewModel.create({ name, area, rating: Number(rating), text, date, avatar: avatar || "" });
  return res.status(201).json({ success: true, data: review });
};

/** POST /api/reviews/public (public) */
const submitPublicReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  const { name, area, rating, text, date, avatar } = req.body;
  const review = await ReviewModel.create({ name, area, rating: Number(rating), text, date, active: true, avatar: avatar || "" });
  return res.status(201).json({ success: true, message: "Review submitted successfully", data: review });
};

/** PUT /api/reviews/:id  (protected) */
const updateReview = async (req, res) => {
  const allowed = ["name", "area", "rating", "text", "date", "active", "avatar"];
  const payload = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }
  if (payload.rating) payload.rating = Number(payload.rating);

  const review = await ReviewModel.update(req.params.id, payload);
  return res.json({ success: true, data: review });
};

/** PATCH /api/reviews/:id/toggle (protected) */
const toggleReviewActive = async (req, res) => {
  const review = await ReviewModel.findById(req.params.id);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });
  const updated = await ReviewModel.update(req.params.id, { active: !review.active });
  return res.json({ success: true, data: updated });
};

/** DELETE /api/reviews/:id  (protected) */
const deleteReview = async (req, res) => {
  await ReviewModel.remove(req.params.id);
  return res.json({ success: true, message: "Review deleted" });
};

const reviewValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  // body("area").trim().notEmpty().withMessage("Area is required"),
  body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("Rating must be 1-5"),
  body("text").trim().notEmpty().withMessage("Review text is required"),
  body("date").trim().notEmpty().withMessage("Date is required"),
];

module.exports = { getAllReviews, getAllReviewsAdmin, getReviewById, createReview, submitPublicReview, updateReview, toggleReviewActive, deleteReview, reviewValidation };
