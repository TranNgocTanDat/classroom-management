const { firebaseRealtime } = require("../config/firebase");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../config/email");

// create path user.json node in Firebase realtime database
const USERS_PATH = "/users.json";

// add user
async function addUser({ name, phone, email, password, role }) {
  try {
    const uid = `${role}_${Date.now()}`;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    };
    const response = await firebaseRealtime.put(`/users/${uid}.json`, user);
    return { uid, ...response.data };
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// get user by phone
async function getUserByPhone(phone) {
  try {
    const response = await firebaseRealtime.get(USERS_PATH);
    const users = response.data || {};

    const user = Object.values(users).find((u) => u.phone === phone);
    return user || null;
  } catch (error) {
    console.error("Error getting user by phone:", error);
    throw error;
  }
}

//get student by email
async function getUserByEmail(email) {
  try {
    const response = await firebaseRealtime.get(USERS_PATH);
    const users = response.data || {};

    const user = Object.values(users).find((u) => u.email === email && u.role === "student");
    return user || null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

// get all users
async function getAllUsers() {
  try {
    const response = await firebaseRealtime.get(USERS_PATH);
    return response.data || {};
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

// generate password
async function generatePassword(length = 8) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

//add student
async function addStudent({ name, phone, email }) {
  try {
    // generate random password
    const password = await generatePassword();

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const uid = `student_${Date.now()}`;
    const user = {
      name,
      phone,
      email,
      password: hashedPassword,
      role: "student",
    };

    // save user to firebase
    await firebaseRealtime.put(`/users/${uid}.json`, user);

    //send email with password
    await sendEmail(
      email,
      "Thông tin đăng nhập Classroom",
      `Chào ${name},\n\nBạn đã được thêm vào hệ thống Classroom.\n\nThông tin đăng nhập:\n- Email: ${email}\n- Mật khẩu: ${password}\n`
    );

    return { success: true, message: "Student added and email sent successfully.", user: { uid, ...user } };
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
}

module.exports = { addUser, getUserByPhone, getAllUsers, addStudent, getUserByEmail};
