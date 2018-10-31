const UserModel = (sequelize, Sequelize) => sequelize.define('user', {
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  level: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  applicationID: { type: Sequelize.INTEGER },
});

export default UserModel;
