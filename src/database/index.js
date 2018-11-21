import mongoose from 'mongoose';

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const options = {
  user: DB_USER,
  pass: DB_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
};

const db = () => Promise.resolve(
  mongoose.connect(
    `${DB_HOST}/${DB_NAME}`,
    options,
  ),
);


db()
  .then(() => console.log('> DB Connected'))
  .catch(e => console.log(e.message));
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// dotenv.config();
// const {
//   DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, STAGE,
// } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialectOptions: {
//     ssl: STAGE === 'PROD',
//   },
//   dialect: 'postgres',
//   operatorsAliases: false,
// });

// sequelize
//   .authenticate()
//   .then(console.log('Connection has been established successfully.'))
//   .catch(err => console.error('Unable to connect to the database:', err));

// export { sequelize, Sequelize };
