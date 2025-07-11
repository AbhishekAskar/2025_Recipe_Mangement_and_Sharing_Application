const { Collection, Recipe, User } = require("../Models");

// ✅ 1. Create a collection
exports.createCollection = async (req, res) => {
  try {
    const { title } = req.body;
    const collection = await Collection.create({
      title,
      userId: req.user.userId,
    });
    res.status(201).json({ message: "Collection created", collection });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 2. Add a recipe to a collection
exports.addRecipeToCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, userId: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    await collection.addRecipe(recipeId);
    res.status(200).json({ message: "Recipe added to collection" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 3. Remove recipe from collection
exports.removeRecipeFromCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, userId: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    await collection.removeRecipe(recipeId);
    res.status(200).json({ message: "Recipe removed from collection" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 4. Get all collections (with recipes)
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { userId: req.user.userId },
      include: {
        model: Recipe,
        attributes: ["id", "title", "cookingTime"],
      },
    });
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 5. Delete a collection
exports.deleteCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, userId: req.user.userId },
    });
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    await collection.destroy();
    res.status(200).json({ message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
