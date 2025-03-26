const mongoose = require("mongoose");

const KayVolunteerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nicNumber: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Teaching", "Medical services", "Other"],
        required: true
    },
    teachingSubjects: {
        type: String,
        required: function () {
            return this.category === "Teaching";
        }
    },
    medicalServices: {
        type: String,
        required: function () {
            return this.category === "Medical services";
        }
    },
    otherService: {
        type: String,
        required: function () {
            return this.category === "Other";
        }
    },
    acceptTerms: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (value) {
                return value === true;
            },
            message: "You must accept the terms and conditions."
        }
    },
    photo: {
        type: String, // Stores the filename of the uploaded image
        required: false
    },
    isApproved: {
        type: Boolean,
        default: false // Admin approval required
    },
    username: {
        type: String,
        unique: true,
        sparse: true // Only for approved caregivers
    },
    password: {
        type: String,
        required: false // Set when approved
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model("KayVolunteer", KayVolunteerSchema);
