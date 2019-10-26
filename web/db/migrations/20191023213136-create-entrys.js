module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Entrys', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    location: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM('public', 'private'),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Entrys'),

};
