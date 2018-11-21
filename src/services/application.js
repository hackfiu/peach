import { ForbiddenError } from 'apollo-server-express';
import User from '../models';

/**
 * Updates the given user's application with the given arguments.
 * @param {number} userId The user's ID.
 * @param {Object} args The arguments with which to update the application.
 */
const update = async (userId, args) => {
  try {
    if (!userId) {
      throw new ForbiddenError('User is not logged in.');
    }
    const { status, level } = await User.findById(userId);
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    if (status !== 'VERIFIED') {
      throw new ForbiddenError('User has already submitted an application.');
    }
    const {
      firstName,
      lastName,
      levelOfStudy,
      major,
      shirtSize,
      gender,
    } = args;

    const options = {
      firstName,
      lastName,
      levelOfStudy,
      major,
      shirtSize,
      gender,
    };

    const user = await User.findByIdAndUpdate(userId, { application: options });
    const { application } = user;
    return application;
  } catch (err) {
    throw err;
  }
};

export default { update };
