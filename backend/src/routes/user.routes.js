const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:phone", userController.getUserByPhoneController);

router.post("/addStudent", authMiddleware(["instructor"]) ,userController.addStudentController);

// PUT /api/users/:userId
router.put("/:uid", authMiddleware, userController.updateStudentController);

// DELETE /api/users/:userId
router.delete("/:uid", authMiddleware, userController.deleteStudentController);

module.exports = router;