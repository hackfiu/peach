module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('applications', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    levelOfStudy: { type: Sequelize.STRING },
    major: { type: Sequelize.STRING },
    shirtSize: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
  }),

  down: queryInterface => queryInterface.dropTable('applications'),
};
