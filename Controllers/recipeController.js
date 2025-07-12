const { Recipe, User } = require("../Models");
const { Op } = require("sequelize");
const s3 = require("../Utils/s3");
const { v4: uuidv4 } = require("uuid");

exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, servings, difficulty } = req.body;
    const userId = req.user.userId;

    let imageUrl = null;

    if (req.file) {
      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `recipe-images/${uuidv4()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(s3Params).promise();
      imageUrl = uploadResult.Location;
    }

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      userId,
      imageUrl,
    });

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.searchAndFilterRecipes = async (req, res) => {
  try {
    const { keyword, dietary, difficulty, maxPrepTime } = req.query;

    const whereClause = {};

    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { ingredients: { [Op.like]: `%${keyword}%` } },
      ];
    }

    if (dietary) {
      whereClause.dietaryPreference = dietary.toLowerCase();
    }

    if (difficulty) {
      whereClause.difficulty = difficulty.toLowerCase();
    }

    if (maxPrepTime) {
      whereClause.cookingTime = { [Op.lte]: parseInt(maxPrepTime) };
    }

    const recipes = await Recipe.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.status(200).json({ count: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};