const UserDocument = (Mongoose, application) => Mongoose.model('users', new Mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: String, required: true },
  application,
}));

export default UserDocument;
// const UserModel = (sequelize, Sequelize) => sequelize.define('user', {
//   email: { type: Sequelize.STRING, unique: true, allowNull: false },
//   password: { type: Sequelize.STRING, allowNull: false },
//   level: { type: Sequelize.STRING, allowNull: false },
//   status: { type: Sequelize.STRING, allowNull: false },
// });

// export default UserModel;
