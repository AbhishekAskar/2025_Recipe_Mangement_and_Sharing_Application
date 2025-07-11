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
      type: DataTypes.TEXT, // Can be JSON or plain text
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
      type: DataTypes.ENUM("Easy", "Medium", "Hard"),
      defaultValue: "Easy",
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });

  return Recipe;
};
