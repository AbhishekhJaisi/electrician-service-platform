const AreaModel = require("../models/areaModel");
const cache     = require("../lib/cache");

/** GET /api/areas */
const getAllAreas = async (_req, res) => {
  const data = await cache.get("areas", () => AreaModel.findAll());
  return res.json({ success: true, data });
};

/** POST /api/areas  (protected) */
const createArea = async (req, res) => {
  const { name, order } = req.body;
  const area = await AreaModel.create({ name, order: Number(order || 0) });
  cache.bust("areas");
  return res.status(201).json({ success: true, data: area });
};

/** PUT /api/areas/:id  (protected) */
const updateArea = async (req, res) => {
  const payload = {};
  if (req.body.name  !== undefined) payload.name  = req.body.name;
  if (req.body.order !== undefined) payload.order = Number(req.body.order);
  const area = await AreaModel.update(req.params.id, payload);
  cache.bust("areas");
  return res.json({ success: true, data: area });
};

/** DELETE /api/areas/:id  (protected) */
const deleteArea = async (req, res) => {
  await AreaModel.remove(req.params.id);
  cache.bust("areas");
  return res.json({ success: true, message: "Area deleted" });
};

module.exports = { getAllAreas, createArea, updateArea, deleteArea };
