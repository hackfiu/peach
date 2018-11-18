import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { User, Application } from '../../../models';

import userService from '../../../services/user';
import emailService from '../../../services/email';

const { SECRET, SALT_ROUNDS } = process.env;
const saltRounds = parseInt(SALT_ROUNDS);

const signUp = async (root, args) => {
  const { email, password } = args;
  try {
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

    const verificationToken = jwt.sign({ id, verification: true }, SECRET);
    await emailService.sendVerification(email, verificationToken);

    const loginToken = jwt.sign({ id });
    return { token: loginToken };
  } catch (err) {
    throw err;
  }
};

const logIn = async (root, args) => {
  const { email, password } = args;
  try {
    const user = await User.findOne({ where: { email } });
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!user || !correctPassword) {
      throw new AuthenticationError('Incorrect login');
    }
    const { id, status } = user;
    if (status === 'UNVERIFIED') {
      throw new ForbiddenError('User unverified');
    }
    const loginToken = jwt.sign({ id }, SECRET);
    return { token: loginToken };
  } catch (err) {
    throw err;
  }
};

const verify = async (root, args) => {
  const { token } = args;
  try {
    const { id, verification } = jwt.verify(token, SECRET);
    if (!verification) {
      throw new AuthenticationError('Invalid token.');
    }
    await userService.updateStatus(id, 'VERIFIED');
    const loginToken = jwt.sign({ id }, SECRET);
    return { token: loginToken };
  } catch (err) {
    throw err;
  }
};

export { signUp, logIn, verify };
