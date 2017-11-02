module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'favourite', Sequelize.ARRAY(Sequelize.INTEGER));
  },

  down: (queryInterface /* , Sequelize */) => {
    queryInterface.removeColumn('Users', 'favourite');
  }
};
