const BusinessModel = require("../models/businessModel");

/** GET /api/business */
const getBusiness = async (_req, res) => {
  const data = await BusinessModel.find();
  return res.json({ success: true, data });
};

/** PUT /api/business  (protected) */
const updateBusiness = async (req, res) => {
  const allowed = ["name", "owner", "tagline", "phone", "whatsapp", "email", "address", "hours", "years"];
  const payload = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }
  if (payload.years) payload.years = Number(payload.years);

  const data = await BusinessModel.update(payload);
  return res.json({ success: true, data });
};

module.exports = { getBusiness, updateBusiness };
