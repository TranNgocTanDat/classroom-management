const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;   