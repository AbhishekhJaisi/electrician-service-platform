const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const prisma   = require("../lib/prisma");
const { sendOTP } = require("../lib/email");

// Generate 6-digit OTP
const makeOTP = () => String(Math.floor(100000 + Math.random() * 900000));

/** POST /api/customer/otp/send  — body: { email } */
const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }

    const otp    = makeOTP();
    const hashed = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await prisma.customer.upsert({
      where:  { email },
      update: { otp: hashed, otpExpiry: expiry },
      create: { email, otp: hashed, otpExpiry: expiry },
    });

    await sendOTP(email, otp);

    return res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    next(err);
  }
};

/** POST /api/customer/otp/verify  — body: { email, otp } */
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required" });
    }

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer || !customer.otp || !customer.otpExpiry) {
      return res.status(401).json({ success: false, message: "No OTP requested for this email" });
    }
    if (new Date() > customer.otpExpiry) {
      return res.status(401).json({ success: false, message: "OTP expired — request a new one" });
    }

    const match = await bcrypt.compare(otp, customer.otp);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // Clear OTP after use
    await prisma.customer.update({
      where:  { email },
      data:   { otp: null, otpExpiry: null },
    });

    const token = jwt.sign(
      { id: customer.id, email, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ success: true, token, customer: { id: customer.id, email, name: customer.name } });
  } catch (err) {
    next(err);
  }
};

/** GET /api/customer/bookings — customer's own bookings */
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where:   { customerId: req.customer.id },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

/** GET /api/customer/bookings/:id/receipt */
const getReceipt = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: Number(req.params.id), customerId: req.customer.id },
    });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const business = await prisma.business.findFirst();
    return res.json({ success: true, data: { booking, business } });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendOtp, verifyOtp, getMyBookings, getReceipt };
