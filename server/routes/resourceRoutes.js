// Dependencies
const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getAllResources,
  getResources,
  createUserResource,
  addResourceToTeam,
  updateResource,
  deleteResource,
  getSelectedUserResource,
} = require("../controllers/resourceController");

//Routes

//Get all resources
router.get("/all", protect, getAllResources);

//Create resource and get user resource
router.route("/").get(protect, getResources).post(protect, createUserResource);

//Update and delete user resource
router
  .route("/:id")
  .get(protect, getSelectedUserResource)
  .patch(protect, updateResource)
  .delete(protect, deleteResource);

//Add resource for team
router.route("/addtoteam").post(protect, addResourceToTeam);
//Exports
module.exports = router;
