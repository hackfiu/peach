import { ForbiddenError } from 'apollo-server-express';
import { Application, User } from '../models';


const updateApplication = async (userId, args) => {
  try {
    const { status } = await User.findById(userId);
    if (status !== 'VERIFIED') {
      throw new ForbiddenError('User has already submitted an application.');
    }
    const {
      firstName, lastName, levelOfStudy, major, shirtSize, gender,
    } = args;
    const update = await Application.update({
      firstName, lastName, levelOfStudy, major, shirtSize, gender,
    },
    {
      where: { userId },
      returning: true,
    });
    return update[1][0];
  } catch (err) {
    throw err;
  }
};

export default { updateApplication };
