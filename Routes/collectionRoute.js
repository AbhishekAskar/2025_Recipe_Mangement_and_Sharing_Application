const express = require("express");
const router = express.Router();
const {
  createCollection,
  addRecipeToCollection,
  removeRecipeFromCollection,
  getAllCollections,
  deleteCollection,
} = require("../Controllers/collectionController");

const { verifyToken } = require("../Middlewares/authMiddleware");

// Create a collection
router.post("/", verifyToken, createCollection);

// Add recipe to collection
router.post("/:collectionId/:recipeId", verifyToken, addRecipeToCollection);

// Remove recipe from collection
router.delete("/:collectionId/:recipeId", verifyToken, removeRecipeFromCollection);

// Get all collections with recipes
router.get("/", verifyToken, getAllCollections);

// Delete collection
router.delete("/:collectionId", verifyToken, deleteCollection);

module.exports = router;
