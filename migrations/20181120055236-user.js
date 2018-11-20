module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    level: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
  }),

  down: queryInterface => queryInterface.dropTable('users'),
};
