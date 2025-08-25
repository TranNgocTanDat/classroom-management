const jwt = require("jsonwebtoken");

//generate JWT token
function generateToken(user) {
  const payload = {
    uid: user.uid,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

//verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

module.exports = {  generateToken, verifyToken };
