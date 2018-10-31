import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { initSequlize, User, Application } from './models';

const { SECRET } = process.env;

initSequlize();

// Queries

const info = () => 'This is a GraphQL Server';

// Mutations

const signUp = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Error(`Email ${email} already exists.`);
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email, password: hashed, status: 'UNVERIFIED', level: 'HACKER', application: {},
    }, { include: [Application] });
    const token = jwt.sign({ email, level: 'HACKER' }, SECRET);
    console.log({ token });
    return newUser;
  } catch (err) {
    const { message } = err;
    console.log({ message });
    throw err;
  }
};

const logIn = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    console.log({ user });
    if (user) {
      console.log({ peepee: 'poopoo' });
      if (user.status === 'UNVERIFIED') {
        throw new Error('User unverified');
      }
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email, level: user.level });
        console.log({ token });
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
