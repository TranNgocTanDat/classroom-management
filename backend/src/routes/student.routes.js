const express = require("express");
const studentController = require("../controllers/student.controller");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

// GET /api/students
router.get("/", authMiddleware, studentController.getStudentsWithLessonsController);

// GET /api/students/:uid
router.get("/:uid", authMiddleware, studentController.getStudentDetailController);

module.exports = router;