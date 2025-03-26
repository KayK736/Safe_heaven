const KayAdmin = require("../models/KayAdmin");
const KayCaregiver = require("../models/KayCaregiver");
const bcrypt = require("bcryptjs");

exports.usernameLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check admin first
    const admin = await KayAdmin.findOne({ username });
    if (admin && await bcrypt.compare(password, admin.password)) {
      return res.json({ 
        token: generateToken(admin._id),
        userType: "admin",
        user: admin
      });
    }
    
    // Check caregiver
    const caregiver = await KayCaregiver.findOne({ username }).select("+password");
    if (caregiver && await bcrypt.compare(password, caregiver.password)) {
      return res.json({
        token: generateToken(caregiver._id),
        userType: "caregiver",
        user: caregiver
      });
    }
    
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateToken(userId) {
  // Implement JWT token generation
  return "sample_token_" + userId;
}