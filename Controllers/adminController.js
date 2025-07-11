const { User, Recipe } = require("../Models");

// 1. Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.status(200).json(users);
};

// 2. Ban or Unban a user
exports.toggleUserBan = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isBanned = !user.isBanned;
  await user.save();

  res.status(200).json({ message: `User has been ${user.isBanned ? "banned" : "unbanned"}` });
};

// 3. Delete a recipe
exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.recipeId);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  await recipe.destroy();
  res.status(200).json({ message: "Recipe deleted successfully" });
};
