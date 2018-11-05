import { sequelize, Sequelize } from '../database';

import ApplicationModel from './application';
import UserModel from './user';

const Application = ApplicationModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

const initSequelize = () => {
  User.hasOne(Application, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
  sequelize.sync();
};

export { Application, User, initSequelize };
