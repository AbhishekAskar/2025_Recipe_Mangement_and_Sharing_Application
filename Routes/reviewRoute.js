const express = require("express");
const router = express.Router();
const {
  addOrUpdateReview,
  getRecipeReviews,
  deleteReview,
} = require("../Controllers/reviewController");

const { verifyToken } = require("../Middlewares/authMiddleware");

// Add or update review
router.post("/:recipeId", verifyToken, addOrUpdateReview);

// Get all reviews for a recipe
router.get("/:recipeId", getRecipeReviews);

// Delete own review
router.delete("/:recipeId", verifyToken, deleteReview);

module.exports = router;
