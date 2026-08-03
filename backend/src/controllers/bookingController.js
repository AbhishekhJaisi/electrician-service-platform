const BookingModel = require("../models/bookingModel");
const prisma       = require("../lib/prisma");
const { notifyAdmin } = require("../services/notify");
const { sendBookingConfirmation } = require("../lib/email");

const BookingController = {
  async create(req, res, next) {
    try {
      const booking = await BookingModel.create(req.body);

      // Link to customer if email provided
      if (booking.email) {
        try {
          const customer = await prisma.customer.upsert({
            where:  { email: booking.email },
            update: {},
            create: { email: booking.email, name: booking.name },
          });
          await prisma.booking.update({
            where: { id: booking.id },
            data:  { customerId: customer.id },
          });
        } catch (e) {
          console.error("[Booking] Customer link failed:", e.message);
        }

        // Send confirmation email (non-blocking)
        sendBookingConfirmation(booking.email, booking).catch((e) =>
          console.error("[Booking] Confirmation email failed:", e.message)
        );
      }

      await notifyAdmin(booking);

      res.status(201).json({ success: true, booking });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const bookings = await BookingModel.findAll();
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: "Status is required" });

      const formattedStatus = String(status).toUpperCase();
      const allowed = ["NEW", "CONTACTED", "COMPLETED", "CANCELLED"];
      if (!allowed.includes(formattedStatus)) {
        return res.status(422).json({ error: `Status must be one of: ${allowed.join(", ")}` });
      }

      const booking = await BookingModel.update(req.params.id, { status: formattedStatus });
      res.json(booking);
    } catch (err) {
      if (err.code === "P2025") return res.status(404).json({ error: "Booking not found" });
      next(err);
    }
  },
};

module.exports = BookingController;
