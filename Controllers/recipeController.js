const { Recipe, User } = require("../Models");

exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, servings, difficulty } = req.body;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      userId: req.user.userId, // from JWT
    });

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ include: User });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, { include: User });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.update(req.body);
    res.status(200).json({ message: "Recipe updated", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
