// Example validation middleware - You can expand it
module.exports = (req, res, next) => {
    const { fullName, email, nicNumber, phone, address, experienceYears, acceptTerms } = req.body;
    if (!fullName || !email || !nicNumber || !phone || !address || !experienceYears) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    if (acceptTerms !== true && acceptTerms !== "true") {
        return res.status(400).json({ message: "You must accept the terms and conditions" });
    }
    next();
};
