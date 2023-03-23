//Dependencies
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Resource = require("../models/resourceModel");
const bcrypt = require("bcryptjs");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Get single user data api/users/me @private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, team, role } = await User.findById(req.user.id);
  res.status(200).json(req.user);
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//Get all users from specific team api/users/team @private
const getUsersByTeam = asyncHandler(async (req, res) => {
  const team = req.params.team;
  const users = await User.find({ team });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@
//Get user by id api/users/:id @private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@
//Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const filter = {};
  const users = await User.find(filter);
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@
//Change password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await user.updateOne({ password: hashedPassword });
  if (updatedUser) {
    const users = await User.find({});
    res.status(200).json(users);
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@
//Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    const users = await User.find({});
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@
//Export user data
const exportUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const resources = await Resource.find({ user: req.params.id });
  res.status(200).json({ user, resources });
});

module.exports = {
  getUser,
  getUsersByTeam,
  getUserById,
  getAllUsers,
  deleteUser,
  changePassword,
  exportUserData,
};
