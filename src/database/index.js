import mongoose from 'mongoose';

// fixing bugs from old mongo with this fix as referred to this github issue: https://github.com/Automattic/mongoose/issues/7108
mongoose.set('useFindAndModify', false);

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const mongoURL = `${DB_HOST}/${DB_NAME}`;

const options = {
  user: DB_USER,
  pass: DB_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
};

const initMongoose = async () => mongoose.connect(
  mongoURL,
  options,
);


initMongoose()
  .then(() => console.log(`> Connected to Mongo instance at ${mongoURL}`))
  .catch(err => console.error('Error connecting to Mongo instance:', err));
