const { firebaseRealtime } = require("../config/firebase");
const { getUserByPhone, getUserByEmail } = require("./user.service");

const crypto = require("crypto");
// const twilio = require("twilio");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../config/email");

// // setup twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// login
async function login(phone, password) {
  try {
    // get user by phone
    const user = await getUserByPhone(phone);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, message: "Invalid password" };
    }

    // sms verification
    const accessCode = await createAccessCode(phone, user);
    if (!accessCode.success) {
      return { success: false, message: "Failed to send verification code" };
    }

    return {
      success: true,
      message: "OTP sent to email",
      user: { phone: user.phone, role: user.role },
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// create code
async function createAccessCode(phone, user) {
  try {
    // generate random code
    const accessCode = crypto.randomInt(100000, 999999).toString();

    // save code to firebase
    await firebaseRealtime.put(`/accessCodes/${phone}.json`, {
      code: accessCode,
      createdAt: new Date().toISOString(),
    });

    // // send code via SMS
    // await twilioClient.messages.create({
    //   body: `Your verification code is: ${accessCode}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone,
    // });

    // send code via email
    await sendEmail(
      user.email,
      "Your verification code",
      `Your verification code is: ${accessCode}`
    );

    return { success: true, message: "Code sent successfully" };
  } catch (error) {
    console.error("Error creating code:", error);
    throw error;
  }
}

async function validateAccessCode(phone, code) {
  try {
    // get code from firebase
    const response = await firebaseRealtime.get(`/accessCodes/${phone}.json`);
    const accessCodeData = response.data;

    if (!accessCodeData || accessCodeData.code !== code) {
      return { success: false, message: "Invalid code" };
    }

    // check if user exists
    const user = await getUserByPhone(phone);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // delete code after validation
    await firebaseRealtime.delete(`/accessCodes/${phone}.json`);

    return { success: true, message: "Code validated successfully", user };
  } catch (error) {
    console.error("Error validating access code:", error);
    throw error;
  }
}

function encodeKey(str) {
  return str.replace(/\./g, "_");  // đổi "." thành "_"
}

//create code student
async function createAccessCodeStudent(email, user) {
  try {
    // generate random code
    const accessCode = crypto.randomInt(100000, 999999).toString();

    const safeKey = encodeKey(email);

    // save code to firebase
    await firebaseRealtime.put(`/accessCodes/${safeKey}.json`, {
      code: accessCode,
      createdAt: new Date().toISOString(),
    });

    // send code email
    await sendEmail(
      user.email,
      "Your verification code",
      `Your verification code is: ${accessCode}`
    );

    return { success: true, message: "Code sent successfully" };
  } catch (error) {
    console.error("Error creating code:", error);
    throw error;
  }
}
// validate access code sutdent
async function validateAccessCodeStudent(email, code) {
  try {
    const safeKey = encodeKey(email);

    // get code from firebase
    const response = await firebaseRealtime.get(`/accessCodes/${safeKey}.json`);
    const accessCodeData = response.data;

    if (!accessCodeData || accessCodeData.code !== code) {
      return { success: false, message: "Invalid code" };
    }

    // check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // delete code after validation
    await firebaseRealtime.delete(`/accessCodes/${safeKey}.json`);

    return { success: true, message: "Code validated successfully", user };
  } catch (error) {
    console.error("Error validating access code:", error);
    throw error;
  }
}

// login student
async function loginStudent(email, password) {
  try {
    // get user by email
    const user = await getUserByEmail(email);
    console.log("User found:", user);
    if (!user) {
      console.log("User found:", user);
      return { success: false, message: "User not found" };
    }

    // compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, message: "Invalid password" };
    }

    // create access code
    const accessCode = await createAccessCodeStudent(email, user);
    if (!accessCode.success) {
      return { success: false, message: "Failed to send verification code" };
    }

    return {
      success: true,
      message: "OTP sent to email",
      user: { phone: user.phone, role: user.role },
    };
  } catch (error) {
    console.error("Error during student login:", error);
    throw error;
  }
}


module.exports = { login, loginStudent, createAccessCode, validateAccessCode, createAccessCodeStudent, validateAccessCodeStudent };
