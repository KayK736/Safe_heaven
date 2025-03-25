const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    patientCount: { type: Number, required: true },
    totalDonations: { type: Number, default: 0 }
});

module.exports = mongoose.model("Home", homeSchema);