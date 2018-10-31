import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

const verifyUser = (email) => {
  console.log(email);
};

const verify = (req, res) => {
  try {
    const { token } = req.query;
    const { email } = jwt.verify(token, SECRET);
    verifyUser(email);
    res.send({ success: true });
  } catch (err) {
    throw err;
  }
};

export default verify;
