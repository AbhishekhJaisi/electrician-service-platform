const express = require("express");
const router = express.Router();

const BookingController = require("../controllers/bookingController");
const authAdmin = require("../middleware/authAdmin");

// Public
router.post(
  "/bookings",
  BookingController.create
);

// Admin
router.get(
  "/admin/bookings",
  authAdmin,
  BookingController.getAll
);

router.patch(
  "/admin/bookings/:id",
  authAdmin,
  BookingController.updateStatus
);

module.exports = router;