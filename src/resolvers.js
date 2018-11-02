import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { initSequlize, User, Application } from './models';

const { SECRET, SALT_ROUNDS, SALT_BASE } = process.env;
const saltRounds = parseInt(SALT_ROUNDS, SALT_BASE);

initSequlize();

// ****** Queries *******

const info = () => 'This is a GraphQL Server';

// ****** Mutations *******

const signUp = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Error(`Email ${email} already exists.`);
    }
    const hashed = await bcrypt.hash(password, saltRounds);
    await User.create({
      email, password: hashed, status: 'UNVERIFIED', level: 'HACKER', application: {},
    }, { include: [Application] });
    return jwt.sign({ email, level: 'HACKER' }, SECRET);
  } catch (err) {
    throw err;
  }
};

const logIn = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (user) {
      if (user.status === 'UNVERIFIED') {
        throw new Error('User unverified');
      }
      if (await bcrypt.compare(password, user.password)) {
        return jwt.sign({ email, level: user.level }, SECRET);
      }
    }
    throw new Error('Incorrect login');
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  Query: {
    info,
  },
  Mutation: {
    signUp,
    logIn,
  },
};

export default resolvers;
