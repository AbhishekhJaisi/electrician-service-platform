const BookingModel = require("../models/bookingModel");
const { notifyAdmin } = require("../services/notify");

const BookingController = {
  // Customer submits booking
  async create(req, res, next) {
    try {
      const booking = await BookingModel.create(req.body);

      await notifyAdmin(booking);

      res.status(201).json({
        success: true,
        booking,
      });
    } catch (err) {
      next(err);
    }
  },

  // Admin fetches all bookings
  async getAll(req, res, next) {
    try {
      const bookings = await BookingModel.findAll();

      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },

  // Admin updates booking status
  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const formattedStatus = String(status).toUpperCase();
      const allowed = ["NEW", "CONTACTED", "COMPLETED", "CANCELLED"];
      if (!allowed.includes(formattedStatus)) {
        return res.status(422).json({ error: `Status must be one of: ${allowed.join(", ")}` });
      }

      const booking = await BookingModel.update(req.params.id, {
        status: formattedStatus,
      });

      res.json(booking);
    } catch (err) {
      if (err.code === "P2025") {
        return res.status(404).json({
          error: "Booking not found",
        });
      }

      next(err);
    }
  },
};

module.exports = BookingController;