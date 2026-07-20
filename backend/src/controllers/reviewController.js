const ReviewModel = require("../models/reviewModel");

/** GET /api/reviews */
const getAllReviews = async (_req, res) => {
  const data = await ReviewModel.findAll();
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
  const { name, area, rating, text, date } = req.body;
  const review = await ReviewModel.create({ name, area, rating: Number(rating), text, date });
  return res.status(201).json({ success: true, data: review });
};

/** PUT /api/reviews/:id  (protected) */
const updateReview = async (req, res) => {
  const allowed = ["name", "area", "rating", "text", "date", "active"];
  const payload = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }
  if (payload.rating) payload.rating = Number(payload.rating);

  const review = await ReviewModel.update(req.params.id, payload);
  return res.json({ success: true, data: review });
};

/** DELETE /api/reviews/:id  (protected) */
const deleteReview = async (req, res) => {
  await ReviewModel.remove(req.params.id);
  return res.json({ success: true, message: "Review deleted" });
};

module.exports = { getAllReviews, getReviewById, createReview, updateReview, deleteReview };
