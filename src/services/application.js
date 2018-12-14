import { ForbiddenError, ValidationError } from 'apollo-server-express';

import User from '../models';

import userService from './user';
import driveService from './drive';

/**
 * Updates the given user's application with the given arguments.
 * @param {string} userId The user's ID.
 * @param {Object} args The arguments with which to update the application.
 */
const update = async (userId, args) => {
  try {
    if (!userId) {
      throw new ForbiddenError('User is not logged in.');
    }
    const { email, status, level } = await User.findById(userId);
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    if (status !== 'VERIFIED') {
      throw new ForbiddenError('User has already submitted an application.');
    }

    const {
      firstName, lastName, levelOfStudy, gender, major, shirtSize, resume,
    } = args;

    let path;
    let name;
    if (resume) {
      const { filename, mimetype: mimeType, stream: body } = await resume;
      name = filename;
      path = await driveService.upload({ email, mimeType, body });
    }
    const user = await User.findByIdAndUpdate(userId, {
      application: {
        firstName, lastName, levelOfStudy, gender, major, shirtSize, resume: { name, path },
      },
    }, { new: true });
    const { application } = user;
    return application;
  } catch (err) {
    throw err;
  }
};

/**
 * Returns whether or not an application is valid, i.e. completed.
 * @param {Object} application The application to validate.
 */
const validate = application => (
  Object.keys(application).reduce((valid, key) => application[key] != null && valid, true)
);

/**
 * Submits a user's completed application.
 * @param {string} userId The user's ID.
 * @param {Object} args The arguments with which to submit the application.
 */
const submit = async (userId, args) => {
  try {
    const application = await update(userId, args);
    const valid = validate(application);
    if (!valid) {
      throw new ValidationError('Application incomplete.');
    }
    await userService.updateStatus(userId, 'SUBMITTED');
    return application;
  } catch (err) {
    throw err;
  }
};

export default { update, submit };
