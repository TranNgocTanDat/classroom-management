const express = require("express");
const lessonController = require("../controllers/lesson.controller");
const checkIntructor = require("../middleware/checkAuth");

const router = express.Router();

// POST /api/lessons
router.post("/", checkIntructor, lessonController.assignLessonController);

// GET /api/lessons
router.get("/", checkIntructor, lessonController.getLessonsController);

module.exports = router;
