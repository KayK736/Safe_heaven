const KayCaregiver = require("../models/KayCaregiver");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }).single("photo");

// ✅ Register a new caregiver
exports.registerCaregiver = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        try {
            const caregiverData = { ...req.body, photo: req.file ? req.file.filename : undefined };
            const caregiver = new KayCaregiver(caregiverData);
            await caregiver.save();
            res.status(201).json({ message: "Caregiver registered successfully, pending approval!", caregiver });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

// ✅ Get all caregivers
exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await KayCaregiver.find();
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get only approved caregivers
exports.getApprovedCaregivers = async (req, res) => {
    try {
        const caregivers = await KayCaregiver.find({ isApproved: true });
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get caregiver by ID
exports.getCaregiverById = async (req, res) => {
    try {
        const caregiver = await KayCaregiver.findById(req.params.id);
        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json(caregiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update caregiver by ID
exports.updateCaregiver = async (req, res) => {
    try {
        const updatedCaregiver = await KayCaregiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCaregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json({ message: "Caregiver updated successfully", updatedCaregiver });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Approve caregiver & assign login credentials
exports.approveCaregiver = async (req, res) => {
    try {
        const { username, password } = req.body;
        const caregiver = await KayCaregiver.findById(req.params.id);
        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });

        caregiver.username = username;
        caregiver.password = await bcrypt.hash(password, 10);
        caregiver.isApproved = true;
        await caregiver.save();

        res.status(200).json({ message: "Caregiver approved successfully!", caregiver });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Caregiver Login
exports.loginCaregiver = async (req, res) => {
    try {
        const { username, password } = req.body;
        const caregiver = await KayCaregiver.findOne({ username });

        if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
        if (!caregiver.isApproved) return res.status(403).json({ message: "Caregiver is not approved by admin" });

        const isMatch = await bcrypt.compare(password, caregiver.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: caregiver._id, username: caregiver.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete caregiver by ID
exports.deleteCaregiver = async (req, res) => {
    try {
        const deletedCaregiver = await KayCaregiver.findByIdAndDelete(req.params.id);
        if (!deletedCaregiver) return res.status(404).json({ message: "Caregiver not found" });
        res.status(200).json({ message: "Caregiver deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
