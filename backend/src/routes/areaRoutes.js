const express = require("express");
const { getAllAreas, createArea, updateArea, deleteArea } = require("../controllers/areaController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",       getAllAreas);
router.post("/",      protect, createArea);
router.put("/:id",    protect, updateArea);
router.delete("/:id", protect, deleteArea);

module.exports = router;
