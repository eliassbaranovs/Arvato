//Dependencies
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// Model
const Resource = require("../models/resourceModel");
const User = require("../models/userModel");

// Description: Get all resources
// Route: GET /api/resources/all
// Access: Private
const getAllResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({});
  res.status(200).json(resources);
});

// Description: Get user resources
// Route: GET /api/resources
// Access: Private
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ user: req.user.id });
  res.status(200).json(resources);
});

// Description: Get selected user resource
// Route: GET /api/resources/:id
// Access: Private
const getSelectedUserResource = asyncHandler(async (req, res) => {
  const resources = await Resource.find({ user: req.params.id });
  res.status(200).json(resources);
});

// Description: Create user resource
// Route: POST /api/resources/
// Access: Private
const createUserResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create({
    name: req.body.text,
    user: mongoose.Types.ObjectId(req.body.selectedUser),
  });
  res.status(200).json({ message: "Resource created successfully!" });
});

// Description: Add resource to all specific team members
// Route: PUT /api/resources/addtoteam
// Access: Private
const addResourceToTeam = asyncHandler(async (req, res) => {
  //Get user status
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  } else if (user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized!");
  }
  const teamMembers = await User.find({ team: req.body.team });
  const memberIds = teamMembers.map((member) => {
    return mongoose.Types.ObjectId(member._id);
  });
  const resources = [];
  memberIds.forEach(async (id) => {
    resources.push({
      user: id,
      name: req.body.text,
    });
  });
  const newResources = await Resource.insertMany(resources);
  res.status(200).json(newResources);
});

// Description: Update user resource
// Route: PUT /api/resources/:id
// Access: Private
const updateResource = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  Resource.findByIdAndUpdate(
    { _id: req.params.id },
    { date: req.body.date },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Resource updated" });
      }
    }
  );
});

// Description: Delete resource
// Route: DELETE /api/resources/:id
// Access: Private
const deleteResource = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const resources = await Resource.find({ user: req.user.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  } else if (user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized!");
  }
  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }
  await resource.remove();
  res.status(200).json(resources);
});
module.exports = {
  getAllResources,
  getResources,
  createUserResource,
  addResourceToTeam,
  updateResource,
  deleteResource,
  getSelectedUserResource,
};
