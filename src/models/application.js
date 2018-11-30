const ApplicationSchema = Mongoose => new Mongoose.Schema({
  firstName: String,
  lastName: String,
  levelOfStudy: String,
  major: String,
  shirtSize: String,
  gender: String,
  resume: String,
});

export default ApplicationSchema;
