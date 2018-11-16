import { Banana } from 'banana-mail';

const { BANANA_SERVICE, BANANA_EMAIL, BANANA_PASS } = process.env;

const banana = new Banana({
  service: BANANA_SERVICE,
  templatePath: 'src/email_templates',
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
  try {
    await banana.send([message]);
  } catch (err) {
    throw err;
  }
};

const sendDecisions = async (hackers, decision) => {
  const messages = hackers.map((hacker) => {
    const { email, firstName, lastName } = hacker;
    const message = {
      to: email,
      subject: '[Peach] Update on Your Application',
      template: decision,
      context: {
        firstName,
        lastName,
      },
    };
    return message;
  });
  try {
    await banana.send(messages);
  } catch (err) {
    throw err;
  }
};

export default { sendVerification, sendDecisions };
