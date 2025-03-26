const express = require("express");
const router = express.Router();
const caregiverController = require("../controllers/KayCaregiverController");
// ✅ Import your validation middleware
const validateCaregiver = require("../middleware/KayValidateCaregiver");

// Caregiver Routes
router.post("/register", validateCaregiver, caregiverController.registerCaregiver);
router.get("/", caregiverController.getAllCaregivers);
router.get("/approved", caregiverController.getApprovedCaregivers);
router.get("/:id", caregiverController.getCaregiverById);
router.put("/:id", caregiverController.updateCaregiver);
router.put("/approve/:id", caregiverController.approveCaregiver);
router.post("/login", caregiverController.loginCaregiver);
router.delete("/:id", caregiverController.deleteCaregiver);

module.exports = router;
