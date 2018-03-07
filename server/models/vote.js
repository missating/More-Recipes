
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    recipeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    upvote: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    downvote: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  });

  Vote.associate = (models) => {
    // associations defined here
    Vote.belongsTo(
      models.Recipe,
      { foreignKey: 'recipeId', onDelete: 'CASCADE' }
    );
    Vote.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return Vote;
};
