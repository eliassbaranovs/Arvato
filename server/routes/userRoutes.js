// Dependencies
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getUser,
  getUsersByTeam,
  getUserById,
  getAllUsers,
  deleteUser,
  changePassword,
  exportUserData,
} = require("../controllers/userController");

router.get("/", protect, getAllUsers);
router.get("/me", protect, getUser);
router.get("/:id", protect, getUserById);
router.post("/changepass/:id", protect, changePassword);
router.delete("/:id", protect, deleteUser);
router.get("/team/:team", protect, getUsersByTeam);
router.get("/export/:id", protect, exportUserData);

module.exports = router;
