const ResumeSchema = Mongoose => new Mongoose.Schema({
  name: String,
  path: String,
});

export default ResumeSchema;
