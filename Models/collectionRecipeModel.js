module.exports = (sequelize, DataTypes) => {
  const CollectionRecipe = sequelize.define("CollectionRecipe", {}, { timestamps: false });
  return CollectionRecipe;
};