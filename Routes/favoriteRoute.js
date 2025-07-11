const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavorites } = require("../Controllers/favoriteController");
const { verifyToken } = require("../Middlewares/authMiddleware");

router.post("/:recipeId", verifyToken, toggleFavorite);
router.get("/", verifyToken, getFavorites);

module.exports = router;
