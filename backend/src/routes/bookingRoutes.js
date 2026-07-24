const express = require("express");
const router = express.Router();

const BookingController = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

// Public
router.post(
  "/bookings",
  BookingController.create
);

// Admin
router.get(
  "/admin/bookings",
  protect,
  BookingController.getAll
);

router.patch(
  "/admin/bookings/:id",
  protect,
  BookingController.updateStatus
);

module.exports = router;