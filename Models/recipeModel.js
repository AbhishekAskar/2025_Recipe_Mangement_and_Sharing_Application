module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT, // store as plain text or JSON string
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cookingTime: {
      type: DataTypes.INTEGER, // in minutes
    },
    servings: {
      type: DataTypes.INTEGER,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "easy",
    },
    dietaryPreference: {
      type: DataTypes.ENUM("vegetarian", "vegan", "gluten-free", "none"),
      defaultValue: "none",
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });

  return Recipe;
};
