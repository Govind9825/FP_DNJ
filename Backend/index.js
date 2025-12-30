const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });



connectToMongo(); // Connect to MongoDB

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", require("./routes/Auth")); // Authentication routes
app.use("/api/notes", require("./routes/Note")); // Note routes

// Health Check Route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {});
