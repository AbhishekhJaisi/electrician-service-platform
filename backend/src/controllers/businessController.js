const BusinessModel = require("../models/businessModel");
const cache         = require("../lib/cache");

/** GET /api/business */
const getBusiness = async (_req, res) => {
  const data = await cache.get("business", () => BusinessModel.find());
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
  cache.bust("business");
  return res.json({ success: true, data });
};

/** POST /api/business/photo  (protected) */
const uploadOwnerPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    await BusinessModel.update({ ownerPhoto: req.file.filename });
    cache.bust("business");
    return res.json({ success: true, ownerPhoto: req.file.filename });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBusiness, updateBusiness, uploadOwnerPhoto };
