const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8079;

// Import Middleware
const logger = require("./middleware/KayLogger");


// Middleware
app.use(cors());
app.use(express.json()); // ✅ Use Express's built-in JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Authentication Routes
app.use("/api/users", require("./routes/KayUserRoutes"));

// Use Routes
app.use("/api/caregivers", require("./routes/KayCaregiverRoutes"));
app.use("/api/volunteers", require("./routes/KayVolunteerRoutes"));
app.use("/api/patients", require("./routes/KayPatientRoutes"));

const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB Connection Error:", error));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected successfully!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
