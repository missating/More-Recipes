

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 1,
    fullname: 'Vanessa Ating',
    username: 'missating',
    email: 'nessa@gmail.com',
    password: 'flowers',
    createdAt: '2007-09-28 01:00:00',
    updatedAt: '2007-09-28 01:00:00'
  }], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
