const Sequelize = require("sequelize");
const sequelize = require("../Utils/db-connection");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.User = require("./userModel")(sequelize, Sequelize);
db.Recipe = require("./recipeModel")(sequelize, Sequelize);
db.FavoriteRecipe = require("./favoriteRecipeModel")(sequelize, Sequelize); // ✅
db.Collection = require("./collectionModel")(sequelize, Sequelize); // ✅
db.CollectionRecipe = require("./collectionRecipeModel")(sequelize, Sequelize); // ✅
db.Review = require("./reviewModel")(sequelize, Sequelize);
db.Follow = require("./followModel")(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Recipe, { foreignKey: "userId" });
db.Recipe.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Recipe.hasMany(db.Review, { foreignKey: "recipeId" });
db.Review.belongsTo(db.User, { foreignKey: "userId" });
db.Review.belongsTo(db.Recipe, { foreignKey: "recipeId" });

// Favorite Recipes
db.User.belongsToMany(db.Recipe, {
  through: db.FavoriteRecipe,
  as: "Favorites",
  foreignKey: "userId",
});
db.Recipe.belongsToMany(db.User, {
  through: db.FavoriteRecipe,
  as: "FavoredBy",
  foreignKey: "recipeId",
});
db.User.belongsToMany(db.User, {
  through: db.Follow,
  as: "Followers",
  foreignKey: "followingId", // who is being followed
});

db.User.belongsToMany(db.User, {
  through: db.Follow,
  as: "Following",
  foreignKey: "followerId", // who follows someone
});

// Collections
db.User.hasMany(db.Collection, { foreignKey: "userId" });
db.Collection.belongsTo(db.User, { foreignKey: "userId" });

db.Collection.belongsToMany(db.Recipe, {
  through: db.CollectionRecipe,
  foreignKey: "collectionId",
});
db.Recipe.belongsToMany(db.Collection, {
  through: db.CollectionRecipe,
  foreignKey: "recipeId",
});

module.exports = db;
