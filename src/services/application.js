import { ForbiddenError } from 'apollo-server-express';

import User from '../models';
import Drive from './drive';


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
      firstName, lastName, levelOfStudy, gender, major, shirtSize, resume,
    } = args;

    const { filename: name, mimetype: mimeType, createReadStream } = await resume;
    const body = createReadStream(name);
    console.log(body);
    const link = Drive.upload({ name, mimeType, body });
    console.log(await link);
    const user = await User.findByIdAndUpdate(userId, {
      application: {
        firstName, lastName, levelOfStudy, gender, major, shirtSize,
      },
    }, { new: true });
    const { application } = user;
    return application;
  } catch (err) {
    throw err;
  }
};

export default { update };
