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
app.use(logger); // ✅ Logger middleware is used here

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// Authentication Routes
app.use("/api/users", require("./routes/KayUserRoutes"));

// Use Routes
app.use("/api/caregivers", require("./routes/KayCaregiverRoutes"));
app.use("/api/volunteers", require("./routes/KayVolunteerRoutes"));
app.use("/api/patients", require("./routes/KayPatientRoutes"));
app.use("/api/payments", require("./routes/KayPaymentRoutes"));

// Register and Login Routes
app.post('/register', (req, res) => {
    // To post / insert data into database
    const { email, password } = req.body;
    UserLogin.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                UserLogin.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    // To find record from the database
    const { email, password } = req.body;
    UserLogin.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user found then these 2 cases
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            }
            // If user not found then
            else {
                res.json("No records found! ");
            }
        });
});

const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connect(process.env.MONGODB_URL)
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