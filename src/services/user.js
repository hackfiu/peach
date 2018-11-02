import jwt from 'jsonwebtoken';
import { User } from '../models';
const { SECRET } = process.env;

const verifyUser = async (email) => {
  try {
    await User.update(
      { status: 'VERIFIED' },
      { where: { email: email } }
    );
    return true;
  } catch (err) {
    throw err
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const { email } = jwt.verify(token, SECRET);
    let result = await verifyUser(email);
    res.send({ success: result });
  } catch (err) {
    throw err;
  }
};

export default { verify };
