const { assignLesson, getAllLessons } = require("../services/lesson.service");

// assign lesson
async function assignLessonController(req, res) {
  try {
    const { title, description, listStudentsTo } = req.body;

    // Validate input
    if (!title || !description || !listStudentsTo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Assign lesson
    const result = await assignLesson({ title, description, listStudentsTo });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error assigning lesson:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getLessonsController(req, res) {
  try {
    const lessons = await getAllLessons();
    res.json({ success: true, lessons });
  } catch (error) {
    console.error("Error getting lessons:", error);
    res.status(500).json({ success: false, message: "Failed to get lessons" });
  }
}

module.exports = { assignLessonController, getLessonsController };
