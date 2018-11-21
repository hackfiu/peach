import mongoose from 'mongoose';
import ApplicationDocument from './application';
import UserDocument from './user';

const Application = ApplicationDocument(mongoose);
const User = UserDocument(mongoose, Application);

export default User;

// import { sequelize, Sequelize } from '../database';

// import ApplicationModel from './application';
// import UserModel from './user';

// const Application = ApplicationModel(sequelize, Sequelize);
// const User = UserModel(sequelize, Sequelize);

// const initSequelize = () => {
//   User.hasOne(Application, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
//   sequelize.sync();
// };

// export { Application, User, initSequelize };
