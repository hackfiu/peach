import { User } from '../models';

const updateStatus = async (id, newStatus) => {
  try {
    await User.update(
      { status: newStatus },
      { where: { id } },
    );
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

export default { updateStatus };
