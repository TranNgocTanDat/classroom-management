const { firebaseRealtime } = require("../config/firebase");

// assign lesson
async function assignLesson({ title, description, listStudentsTo }) {
  try {
    const lessonId = `lesson_${Date.now()}`;

    // create assignment object
    const lesson = {
      title,
      description,
      listStudentsTo,
      createdAt: new Date().toISOString(),
    };

    await firebaseRealtime.put(`/lessons/${lessonId}.json`, lesson);
    return {
      success: true,
      message: "Lesson assigned successfully",
      lesson: { id: lessonId, ...lesson },
    };
  } catch (error) {
    console.error("Error assigning lesson:", error);
    return { success: false, message: "Failed to assign lesson" };
  }
}

// get all lessons
async function getAllLessons() {
  try {
    const response = await firebaseRealtime.get("/lessons.json");
    return response.data || {};
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
}

module.exports = { assignLesson, getAllLessons };
