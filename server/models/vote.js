export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      allownull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allownull: false
    },
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Vote.belongsTo(models.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
  };
  return Vote;
};

