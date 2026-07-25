const ServiceModel = require("../models/serviceModel");
const cache        = require("../lib/cache");

/** GET /api/services */
const getAllServices = async (_req, res) => {
  const data = await cache.get("services", () => ServiceModel.findAll());
  return res.json({ success: true, count: data.length, data });
};

/** GET /api/services/:id */
const getServiceById = async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: "Service not found" });
  return res.json({ success: true, data: service });
};

/** POST /api/services  (protected) */
// const createService = async (req, res) => {
//   const { name, nameAs, desc, price, unit, time, icon, order } = req.body;
//   const service = await ServiceModel.create({ name, nameAs, desc, price: Number(price), unit, time, icon, order: Number(order || 0) });
//   cache.bust("services");
//   return res.status(201).json({ success: true, data: service });
// };

/** POST /api/services  (protected) */
const createService = async (req, res) => {
  const { name, nameAs, desc, price, unit, time, icon, order } = req.body;

  // Required field validation
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Service name is required" });
  }
  if (!desc || !desc.trim()) {
    return res.status(400).json({ success: false, message: "Description is required" });
  }
  if (price === undefined || price === null || price === "") {
    return res.status(400).json({ success: false, message: "Price is required" });
  }
  if (isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({ success: false, message: "Price must be a valid positive number" });
  }
  if (!icon || !icon.trim()) {
    return res.status(400).json({ success: false, message: "Icon is required" });
  }

  const service = await ServiceModel.create({
    name: name.trim(),
    nameAs: (nameAs || "").trim(),
    desc: desc.trim(),
    price: Number(price),
    unit,
    time,
    icon,
    order: Number(order || 0),
  });

  cache.bust("services");
  return res.status(201).json({ success: true, data: service });
};

/** PUT /api/services/:id  (protected) */
const updateService = async (req, res) => {
  const allowed = ["name", "nameAs", "desc", "price", "unit", "time", "icon", "order", "active"];
  const payload = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }
  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.order !== undefined) payload.order = Number(payload.order);

  const service = await ServiceModel.update(req.params.id, payload);
  cache.bust("services");
  return res.json({ success: true, data: service });
};

/** DELETE /api/services/:id  (protected) */
const deleteService = async (req, res) => {
  await ServiceModel.remove(req.params.id);
  cache.bust("services");
  return res.json({ success: true, message: "Service deleted" });
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };
