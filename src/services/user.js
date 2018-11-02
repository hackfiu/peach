import jwt from 'jsonwebtoken';
import { User } from '../models';

const { SECRET } = process.env;

const verifyUser = async (email) => {
  try {
    await User.update(
      { status: 'VERIFIED' },
      { where: { email } },
    );
  } catch (err) {
    throw err;
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const { email } = jwt.verify(token, SECRET);
    await verifyUser(email);
    res.send({ success: true });
  } catch (err) {
    throw err;
  }
};

export default { verify };
