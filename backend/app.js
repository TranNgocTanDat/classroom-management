const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const lessonRoutes = require("./src/routes/lesson.routes");
const studentRoutes = require("./src/routes/student.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/students", studentRoutes);

module.exports = app;
