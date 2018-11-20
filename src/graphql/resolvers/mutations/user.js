import userService from '../../../services/user';

const signUp = async (root, args) => {
  const { email, password } = args;
  try {
    const token = await userService.signUp(email, password);
    return { token };
  } catch (err) {
    throw err;
  }
};

const logIn = async (root, args) => {
  const { email, password } = args;
  try {
    const token = await userService.logIn(email, password);
    return { token };
  } catch (err) {
    throw err;
  }
};

const verify = async (root, args) => {
  const verificationToken = args.token;
  try {
    const token = await userService.verify(verificationToken);
    return { token };
  } catch (err) {
    throw err;
  }
};

export { signUp, logIn, verify };
