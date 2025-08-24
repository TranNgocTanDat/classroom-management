const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// POST /api/auth/login
router.post("/login", authController.loginController);

// POST /api/auth/loginStudent
router.post("/loginStudent", authController.loginController);

// POST /api/auth/validate-access-code
router.post("/validate-access-code", authController.validateAccessCodeController);

module.exports = router;