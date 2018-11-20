const dotenv = require('dotenv');

dotenv.config();

const {
  STAGE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = process.env;

const config = {
  DEV: {
    username: '',
    password: '',
    database: 'peach',
    storage: './peach.sqlite',
    dialect: 'sqlite',
    host: 'localhost',
    logging: () => true,
  },
  PROD: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    logging: () => false,
  },

};

module.exports = config[STAGE];
