import { sequelize, Sequelize } from '../database';

import ApplicationModel from './application';
import UserModel from './user';

const Application = ApplicationModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

const initSequlize = () => {
  User.hasOne(Application, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  sequelize.sync({ force: true });
};

export { Application, User, initSequlize };
