const express = require("express");
const userController = require("../controllers/user.controller");
const checkIntructor = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:phone", userController.getUserByPhoneController);

router.post("/addStudent", checkIntructor ,userController.addStudentController);

// PUT /api/users/:userId
router.put("/:uid", checkIntructor, userController.updateStudentController);

// DELETE /api/users/:userId
router.delete("/:uid", checkIntructor, userController.deleteStudentController);

module.exports = router;