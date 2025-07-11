const { User, Recipe } = require("../Models");

exports.toggleFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findByPk(req.user.userId);
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const isFavorited = await user.hasFavorite(recipe);
    if (isFavorited) {
      await user.removeFavorite(recipe);
      return res.status(200).json({ message: "Recipe removed from favorites" });
    } else {
      await user.addFavorite(recipe);
      return res.status(200).json({ message: "Recipe added to favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    const favorites = await user.getFavorites({
      attributes: ["id", "title", "cookingTime", "difficulty"],
    });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
