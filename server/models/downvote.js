export default (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Downvote.associate = (models) => {
    // associations can be defined here
    Downvote.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Downvote.belongsTo(models.Recipe, { foreignkey: 'recipeId', onDelete: 'CASCADE' });
  };

  return Downvote;
};
