import { Banana } from 'banana-mail';

const { BANANA_EMAIL, BANANA_PASS } = process.env;

const banana = new Banana({
  service: 'gmail',
  templatePath: 'src/templates',
  auth: {
    user: BANANA_EMAIL,
    pass: BANANA_PASS,
  },
});

const sendVerification = async (email, token) => {
  const message = {
    to: email,
    subject: '[Peach] Verify Your Email',
    template: 'verify',
    context: {
      token,
    },
  };
  await banana.send([message]);
};

export default { sendVerification };
