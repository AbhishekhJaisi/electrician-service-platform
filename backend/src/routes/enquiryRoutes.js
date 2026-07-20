const express  = require("express");
const { body } = require("express-validator");
const { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiryStatus } = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const enquiryValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required")
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage("Invalid phone number"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email"),
  body("service").trim().notEmpty().withMessage("Service is required"),
];

router.post(  "/",            enquiryValidation, createEnquiry);
router.get(   "/",            protect, getAllEnquiries);
router.get(   "/:id",         protect, getEnquiryById);
router.patch( "/:id/status",  protect, updateEnquiryStatus);

module.exports = router;
