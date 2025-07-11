module.exports = (sequelize, DataTypes) => {
  const FavoriteRecipe = sequelize.define("FavoriteRecipe", {}, { timestamps: false });
  return FavoriteRecipe;
};
