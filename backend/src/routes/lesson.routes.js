const express = require("express");
const lessonController = require("../controllers/lesson.controller");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

// POST /api/lessons
router.post("/", authMiddleware, lessonController.assignLessonController);

// GET /api/lessons
router.get("/", authMiddleware, lessonController.getLessonsController);

module.exports = router;
