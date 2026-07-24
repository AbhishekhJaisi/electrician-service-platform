const { validationResult }        = require("express-validator");
const EnquiryModel                = require("../models/enquiryModel");
const { notifyAdminNewEnquiry }   = require("../lib/whatsapp");

/** POST /api/enquiries */
const createEnquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, phone, email = "", service, message = "" } = req.body;
  const enquiry = await EnquiryModel.create({ name, phone, email, service, message });

  // Fire WhatsApp notification — non-blocking, never crashes the request
  notifyAdminNewEnquiry({ name, phone, email, service, message }).catch(() => {});

  return res.status(201).json({ success: true, data: enquiry });
};

/** GET /api/enquiries  (protected) */
const getAllEnquiries = async (_req, res) => {
  const data = await EnquiryModel.findAll();
  return res.json({ success: true, count: data.length, data });
};

/** GET /api/enquiries/:id  (protected) */
const getEnquiryById = async (req, res) => {
  const enquiry = await EnquiryModel.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
  return res.json({ success: true, data: enquiry });
};

/** PATCH /api/enquiries/:id/status  (protected) */
const updateEnquiryStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "contacted", "resolved"];
  if (!allowed.includes(status)) {
    return res.status(422).json({ success: false, message: `Status must be one of: ${allowed.join(", ")}` });
  }
  const enquiry = await EnquiryModel.updateStatus(req.params.id, status);
  return res.json({ success: true, data: enquiry });
};

module.exports = { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiryStatus };
