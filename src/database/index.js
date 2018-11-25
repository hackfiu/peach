import mongoose from 'mongoose';

// fixing bugs from old mongo with this fix as referred to this github issue: https://github.com/Automattic/mongoose/issues/7108
mongoose.set('useFindAndModify', false);

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
