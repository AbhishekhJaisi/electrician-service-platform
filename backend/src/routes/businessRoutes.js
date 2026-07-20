const express = require("express");
const { getBusiness, updateBusiness } = require("../controllers/businessController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",  getBusiness);
router.put("/",  protect, updateBusiness);

module.exports = router;
