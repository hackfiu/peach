const ApplicationDocument = Mongoose => new Mongoose.Schema({
  firstName: String,
  lastName: String,
  levelOfStudy: String,
  major: String,
  shirtSize: String,
  gender: String,
});

export default ApplicationDocument;
// const ApplicationModel = (sequelize, Sequelize) => sequelize.define('application', {
//   firstName: { type: Sequelize.STRING },
//   lastName: { type: Sequelize.STRING },
//   levelOfStudy: { type: Sequelize.STRING },
//   major: { type: Sequelize.STRING },
//   shirtSize: { type: Sequelize.STRING },
//   gender: { type: Sequelize.STRING },
// });

// export default ApplicationModel;
