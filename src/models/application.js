const ApplicationModel = (sequelize, Sequelize) => sequelize.define('application', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  levelOfStudy: { type: Sequelize.STRING },
  major: { type: Sequelize.STRING },
  shirtSize: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
});

export default ApplicationModel;
