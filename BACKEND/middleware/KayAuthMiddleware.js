const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), "secretKey");
        if (decoded.username !== "Admin625") {
            return res.status(403).json({ message: "Unauthorized access!" });
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token!" });
    }
};
