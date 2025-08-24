const { firebaseRealtime } = require("../config/firebase");

// get students with lessons
async function getStudentsWithLessons() {
  try {
    //get users
    const usersResponse = await firebaseRealtime.get("/users.json");
    const users = usersResponse.data || {};

    const students = Object.entries(users)
      .filter(([uid, user]) => user.role === "student")
      .map(([uid, user]) => ({ uid, ...user }));

    //get lessons
    const lessonsResponse = await firebaseRealtime.get("/lessons.json");
    const lessons = lessonsResponse.data || {};

    const statusResponse = await firebaseRealtime.get("/lessonStatus.json");
    const allLessonStatus = statusResponse.data || {};

    const studentsWithLessons = students.map((student) => {
      const studentLessons = Object.entries(lessons)
        .filter(
          ([lessonId, lesson]) =>
            lesson.listStudentsTo && lesson.listStudentsTo[student.uid]
        )
        .map(([lessonId, lesson]) => ({
          lessonId,
          title: lesson.title,
          description: lesson.description,
          assignedAt: lesson.createdAt,
          status: allLessonStatus[student.uid]?.[lessonId] || "pending",
        }));

      return {
        ...student,
        lessons: studentLessons,
      };
    });
    return { success: true, data: studentsWithLessons };
  } catch (error) {
    console.error("Error getting students with lessons:", error);
    return { success: false, message: "Failed to get students with lessons" };
  }
}

//get student detail
async function getStudentDetail(uid) {
  try {
    // get user by uid
    const userResponse = await firebaseRealtime.get(`/users/${uid}.json`);
    const student = userResponse.data;

    if (!student || student.role !== "student") {
      return { success: false, message: "Student not found" };
    }

    // get lessons for the student
    const lessonsResponse = await firebaseRealtime.get("/lessons.json");
    const lessons = lessonsResponse.data || {};

    const statusResponse = await firebaseRealtime.get(
      `/lessonStatus/${uid}.json`
    );

    const lessonStatus = statusResponse.data || {};

    const studentLessons = Object.entries(lessons)
      .filter(
        ([lessonId, lesson]) =>
          lesson.listStudentsTo && lesson.listStudentsTo[uid]
      )
      .map(([lessonId, lesson]) => ({
        lessonId,
        title: lesson.title,
        description: lesson.description,
        assignedAt: lesson.createdAt,
        status: lessonStatus[lessonId] || "pending",
      }));

    return {
      success: true,
      data: { ...student, uid, lessons: studentLessons },
    };
  } catch (error) {
    console.error("Error getting student detail:", error);
    return { success: false, message: "Failed to get student detail" };
  }
}

module.exports = { getStudentsWithLessons, getStudentDetail };
