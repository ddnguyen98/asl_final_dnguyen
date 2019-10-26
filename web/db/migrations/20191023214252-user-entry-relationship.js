module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Entrys', 'userId', {
    type: Sequelize.UUID,
    references: {
      model: 'Users',
      key: 'id',
    },
  }),

  down: (queryInterface) => queryInterface.removeColumn('Entrys', 'userId'),
};
