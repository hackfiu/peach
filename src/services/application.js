import { ForbiddenError } from 'apollo-server-express';
import { Application, User } from '../models';


const updateApplication = async (userId, args) => {
  try {
    const { status, level } = await User.findByPk(userId);
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    if (status !== 'VERIFIED') {
      throw new ForbiddenError('User has already submitted an application.');
    }
    const {
      firstName, lastName, levelOfStudy, major, shirtSize, gender,
    } = args;
    await Application.update({
      firstName, lastName, levelOfStudy, major, shirtSize, gender,
    },
    {
      where: { userId },
    });
    const application = Application.findOne({ where: { userId } });
    return application;
  } catch (err) {
    throw err;
  }
};

export default { updateApplication };
