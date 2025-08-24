const express = require("express");
const studentController = require("../controllers/student.controller");
const checkIntructor = require("../middleware/checkAuth");

const router = express.Router();

// GET /api/students
router.get("/", checkIntructor, studentController.getStudentsWithLessonsController);

// GET /api/students/:uid
router.get("/:uid", checkIntructor, studentController.getStudentDetailController);

module.exports = router;