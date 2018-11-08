import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import userService from './services/user';
import applicationService from './services/application';
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
    const token = jwt.sign({ id, level: 'HACKER' }, SECRET);
    return { token };
  } catch (err) {
    throw err;
  }
};

const logIn = async (root, args) => {
  try {
    const { email, password } = args;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthenticationError('Incorrect login');
    }
    const { id, level, status } = user;
    if (status === 'UNVERIFIED') {
      throw new ForbiddenError('User unverified');
    }
    const token = jwt.sign({ id, level }, SECRET);
    return { token };
  } catch (err) {
    throw err;
  }
};

const updateApplication = async (root, args, context) => {
  try {
    const { id, level } = context;
    if (!id) {
      throw new ForbiddenError('User is not logged in.');
    }
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    const application = await applicationService.updateApplication(id, args);
    return application;
  } catch (err) {
    throw err;
  }
};

const submitApplication = async (root, args, context) => {
  try {
    const { id, level } = context;
    if (!id) {
      throw new ForbiddenError('User is not logged in.');
    }
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    const application = await applicationService.updateApplication(id, args);
    await userService.updateStatus(id, 'SUBMITTED');
    console.log(application);
    return application;
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
    updateApplication,
    submitApplication,
  },
};

export default resolvers;
