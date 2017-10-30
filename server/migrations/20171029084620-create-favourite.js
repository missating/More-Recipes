module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('favourites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allownull: false
    },

    recipeId: {
      type: Sequelize.INTEGER,
      allownull: false
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
  down: (queryInterface /* , Sequelize */)=> queryInterface.dropTable('favourites')
};
