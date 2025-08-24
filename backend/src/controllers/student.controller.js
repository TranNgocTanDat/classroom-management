const { getStudentsWithLessons, getStudentDetail } = require("../services/student.service");

// Get students with lessons controller
async function getStudentsWithLessonsController(req, res) {
  try {
    const result = await getStudentsWithLessons();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error getting students with lessons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get student detail controller
async function getStudentDetailController(req, res) {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await getStudentDetail(uid);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error getting student detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getStudentsWithLessonsController, getStudentDetailController };
