import { Banana } from 'banana-mail';
import config from '../config';

const { BANANA_SERVICE, BANANA_EMAIL, BANANA_PASS } = process.env;

const banana = new Banana({
  service: BANANA_SERVICE,
  templatePath: 'src/email_templates',
  auth: {
    user: BANANA_EMAIL,
    pass: BANANA_PASS,
  },
});

/**
 * Sends a verification email to a given email with a given verification token.
 * @param {string} email The email to send verification to.
 * @param {string} token The verification token to send.
 */
const sendVerification = async (email, token) => {
  const message = {
    to: email,
    subject: '[Peach] Verify Your Email',
    template: 'verify',
    context: {
      config,
      token,
    },
  };
  try {
    await banana.send([message]);
  } catch (err) {
    throw err;
  }
};

/**
 * Sends a decision to a list of given hackers.
 * @param {Array<Object>} hackers An array of hacker objects containing email, firstName,
 * and lastName.
 * @param {string} decision The decision to send to the given hackers.
 */
const sendDecisions = async (hackers, decision) => {
  const messages = hackers.map((hacker) => {
    const { email, firstName, lastName } = hacker;
    const message = {
      to: email,
      subject: '[Peach] Update on Your Application',
      template: decision,
      context: {
        config,
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
