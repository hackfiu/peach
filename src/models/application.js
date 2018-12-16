const ApplicationSchema = (mongoose, Resume) => new mongoose.Schema({
  firstName: String,
  lastName: String,
  levelOfStudy: String,
  major: String,
  shirtSize: String,
  gender: String,
  resume: Resume,
});

export default ApplicationSchema;
