const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../Controllers/recipeController");

const { verifyToken } = require("../Middlewares/authMiddleware");

router.post("/", verifyToken, createRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", verifyToken, updateRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
