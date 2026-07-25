const LicenseModel = require("../models/licenseModel");
const cache = require("../lib/cache");

const BUSINESS_ID = 1;

/** GET /api/licenses */
const getLicenses = async (_req, res) => {
  const data = await LicenseModel.findByBusiness(BUSINESS_ID);
  return res.json({ success: true, data });
};

/** POST /api/licenses  (protected) */
const createLicense = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const { label } = req.body;
    if (!label) return res.status(400).json({ error: "Label is required" });
    const data = await LicenseModel.create({
      businessId: BUSINESS_ID,
      label,
      filename: req.file.filename,
    });
    cache.bust("business");
    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/licenses/:id  (protected) */
const deleteLicense = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    await LicenseModel.remove(id, BUSINESS_ID);
    cache.bust("business");
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLicenses, createLicense, deleteLicense };
