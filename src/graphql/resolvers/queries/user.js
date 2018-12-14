import userService from '../../../services/user';

const user = async (root, args, context) => {
  try {
    const { id, level } = context;
    const requestedUser = await userService.find(id, level, args.id);
    return requestedUser;
  } catch (err) {
    throw err;
  }
};

export default user;
