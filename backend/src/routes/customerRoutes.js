const express = require("express");
const { sendOtp, verifyOtp, getMyBookings, getReceipt } = require("../controllers/customerController");
const { protectCustomer } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/otp/send",           sendOtp);
router.post("/otp/verify",         verifyOtp);
router.get( "/bookings",           protectCustomer, getMyBookings);
router.get( "/bookings/:id/receipt", protectCustomer, getReceipt);

module.exports = router;
