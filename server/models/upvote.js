export default (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Upvote.associate = (models) => {
    // associations can be defined here
    Upvote.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Upvote.belongsTo(models.Recipe, { foreignkey: 'recipeId', onDelete: 'CASCADE' });
  };

  return Upvote;
};
