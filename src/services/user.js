import jwt from 'jsonwebtoken';
import { User } from '../models';

const { SECRET } = process.env;

const verifyUser = async (id) => {
  try {
    await User.update(
      { status: 'VERIFIED' },
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
    await verifyUser(id);
    res.send({ success: true });
  } catch (err) {
    res.send({
      success: false,
      data: err,
    });
  }
};

export default { verify };
