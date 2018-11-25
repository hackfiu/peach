import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import User from '../models';

import emailService from './email';

const { SECRET, SALT_ROUNDS } = process.env;
const saltRounds = parseInt(SALT_ROUNDS);

/**
 * Updates a users status to a given status.
 * @param {number} id The id of the user to update.
 * @param {string} status The status that we are changing the user to.
 */
const updateStatus = async (id, status) => {
  try {
    const user = await User.findByIdAndUpdate(id, { status });
    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * Signs up a user with a given email and password.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 */
const signUp = async (email, password) => {
  try {
    const user = await User.findOne({ email });
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
      },
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


/**
 * Attempts to log a user in with a given email and password.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 */
const logIn = async (email, password) => {
  try {
    const user = await User.findOne({ email });
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

/**
 * Verifies a users email with a given verification JWT.
 * @param {string} verificationToken The verification token sent via email.
 */
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
