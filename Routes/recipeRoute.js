const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchAndFilterRecipes 
} = require("../Controllers/recipeController");

const { verifyToken } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/multer");

router.post("/", verifyToken, upload.single("image"), createRecipe);
router.post("/", verifyToken, createRecipe);
router.get("/search", searchAndFilterRecipes);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", verifyToken, updateRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
