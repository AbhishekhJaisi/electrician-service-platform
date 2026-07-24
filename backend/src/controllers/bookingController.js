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
      const booking = await BookingModel.update(req.params.id, {
        status: req.body.status,
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