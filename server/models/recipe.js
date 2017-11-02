export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0
    },

    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultvalue: 0
    }

  });

  Recipe.associate = (models) => {
    // associations defined here
    Recipe.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Recipe.hasMany(models.Review, { foreignKey: 'recipeId' });
  };
  return Recipe;
};

