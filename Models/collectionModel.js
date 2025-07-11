module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define("Collection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Collection;
};