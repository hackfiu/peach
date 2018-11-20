import { Sequelize } from 'sequelize';

const config = require('./config');

const { STAGE = 'DEV' } = process.env;

const {
  database, storage, dialect, host, logging, username, password,
} = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  storage,
  dialect,
  logging,
  dialectOptions: {
    ssl: STAGE === 'PROD',
  },
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

export { sequelize, Sequelize };
