const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const verifyToken = require("../Middlewares/verifyToken");
const isAdmin = require("../Middlewares/isAdmin");

router.use(verifyToken, isAdmin); // All routes below are protected

router.get("/users", adminController.getAllUsers);
router.put("/users/:userId/toggle-ban", adminController.toggleUserBan);
router.delete("/recipes/:recipeId", adminController.deleteRecipe);

module.exports = router;
