import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { User, Application } from './models';

const { SECRET, SALT_ROUNDS } = process.env;
const saltRounds = parseInt(SALT_ROUNDS);

// ****** Queries *******

const info = () => 'This is a GraphQL Server';

// ****** Mutations *******

const signUp = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new AuthenticationError(`Email ${email} already exists.`);
    }
    const hashed = await bcrypt.hash(password, saltRounds);
    const { id } = await User.create(
      {
        email,
        password: hashed,
        status: 'UNVERIFIED',
        level: 'HACKER',
        application: {},
      },
      { include: [Application] },
    );
    return jwt.sign({ id, level: 'HACKER' }, SECRET);
  } catch (err) {
    throw err;
  }
};

const logIn = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AuthenticationError('Incorrect login');
    }
    const { id, level, status } = user;
    if (status === 'UNVERIFIED') {
      throw new ForbiddenError('User unverified');
    }
    return jwt.sign({ id, level }, SECRET);
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
