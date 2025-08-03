const express = require("express");
const router = express.Router();
const {
  Signup,
  Login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

// Base: /api/task/users

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
