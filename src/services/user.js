import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { User, Application } from '../models';

import emailService from './email';

const { SECRET, SALT_ROUNDS } = process.env;
const saltRounds = parseInt(SALT_ROUNDS);

const updateStatus = async (id, newStatus) => {
  try {
    await User.update(
      { status: newStatus },
      { where: { id } },
    );
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    throw err;
  }
};

const signUp = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new AuthenticationError(`Email ${email} already exists.`);
    }
    const hashed = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(
      {
        email,
        password: hashed,
        status: 'UNVERIFIED',
        level: 'HACKER',
        application: {},
      },
      { include: [Application] },
    );
    const { id, level } = newUser;
    const verificationToken = jwt.sign({ id, verification: true }, SECRET);
    emailService.sendVerification(email, verificationToken);
    const loginToken = jwt.sign({ id, level }, SECRET);
    return loginToken;
  } catch (err) {
    throw err;
  }
};

const logIn = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!user || !correctPassword) {
      throw new AuthenticationError('Incorrect login');
    }
    const { id, status, level } = user;
    if (status === 'UNVERIFIED') {
      throw new ForbiddenError('User unverified');
    }
    const loginToken = jwt.sign({ id, level }, SECRET);
    return loginToken;
  } catch (err) {
    throw err;
  }
};

const verify = async (verificationToken) => {
  try {
    const { id, verification } = jwt.verify(verificationToken, SECRET);
    if (!verification) {
      throw new AuthenticationError('Invalid token.');
    }
    const user = await updateStatus(id, 'VERIFIED');
    const { level } = user;
    const loginToken = jwt.sign({ id, level }, SECRET);
    return loginToken;
  } catch (err) {
    throw err;
  }
};

export default {
  updateStatus, signUp, logIn, verify,
};
