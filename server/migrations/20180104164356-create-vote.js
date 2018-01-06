module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },

    upvote: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    downvote: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('Votes')
};

