import jwt from 'jsonwebtoken';
import { User } from '../models';

const { SECRET } = process.env;

const updateStatus = async (id, newStatus) => {
  try {
    return await User.update(
      { status: newStatus },
      { where: { id } },
    );
  } catch (err) {
    throw err;
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token, SECRET);
    await updateStatus(id, 'VERIFIED');
    res.send({ success: true });
  } catch (err) {
    res.send({
      success: false,
      data: err,
    });
  }
};

export default { verify, updateStatus };
