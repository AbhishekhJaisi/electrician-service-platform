const AreaModel = require("../models/areaModel");

/** GET /api/areas */
const getAllAreas = async (_req, res) => {
  const data = await AreaModel.findAll();
  return res.json({ success: true, data });
};

/** POST /api/areas  (protected) */
const createArea = async (req, res) => {
  const { name, order } = req.body;
  const area = await AreaModel.create({ name, order: Number(order || 0) });
  return res.status(201).json({ success: true, data: area });
};

/** PUT /api/areas/:id  (protected) */
const updateArea = async (req, res) => {
  const { name, order } = req.body;
  const payload = {};
  if (name  !== undefined) payload.name  = name;
  if (order !== undefined) payload.order = Number(order);
  const area = await AreaModel.update(req.params.id, payload);
  return res.json({ success: true, data: area });
};

/** DELETE /api/areas/:id  (protected) */
const deleteArea = async (req, res) => {
  await AreaModel.remove(req.params.id);
  return res.json({ success: true, message: "Area deleted" });
};

module.exports = { getAllAreas, createArea, updateArea, deleteArea };
