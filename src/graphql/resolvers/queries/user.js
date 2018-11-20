import { AuthenticationError } from 'apollo-server-express';
import { User } from '../../../models';

const user = async (root, args, context) => {
  try {
    const { id, level } = context;
    if (level !== 'ADMIN' && id.toString() !== args.id) {
      throw new AuthenticationError('Not allowed to fetch this user');
    }
    const requestedUser = await User.findByPk(args.id);
    return requestedUser;
  } catch (err) {
    throw err;
  }
};

export default user;
