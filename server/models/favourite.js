export default (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: {
      type: DataTypes.INTEGER,
      allownull: false
    },

    recipeId: {
      type: DataTypes.INTEGER,
      allownull: false
    },
  });

  Favourite.associate = (models) => {
    // associations defined here
    Favourite.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Favourite.belongsTo(models.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
  };
  return Favourite;
};
