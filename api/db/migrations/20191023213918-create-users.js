module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },

    username: {
      type: Sequelize.STRING,
      unique: true,
    },

    access_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    name: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    type: {
      type: Sequelize.ENUM('github', 'regular'),
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

  down: (queryInterface) => queryInterface.dropTable('Users'),
};
