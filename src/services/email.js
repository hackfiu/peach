import path from 'path';
import { createTransport } from 'nodemailer';
import Email from 'email-templates';

const { EMAIL, EMAIL_PASSWORD } = process.env;

const smtpTransport = createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: EMAIL_PASSWORD },
});

const sendMail = mail => new Promise((resolve, reject) => {
  smtpTransport.sendMail(mail, (err) => {
    smtpTransport.close();
    if (err) reject(err);
    resolve();
  });
});

const loadTemplate = (templateName, hacker) => new Promise(async (resolve, reject) => {
  const templateDir = path.resolve(`src/templates/emails/${templateName}`);
  const template = new Email({ views: { options: { extension: 'hbs' } } });

  try {
    const hackerTemplate = template.renderAll(templateDir, hacker);
    resolve(hackerTemplate);
  } catch (e) {
    reject(e);
  }
});

const send = (hacker, templateName) => new Promise(async (resolve, reject) => {
  const hackerTemplate = await loadTemplate(templateName, hacker);

  try {
    const mail = {
      to: hacker.email,
      from: EMAIL,
      subject: hackerTemplate.subject,
      html: hackerTemplate.html,
      text: hackerTemplate.text,
    };

    resolve(sendMail(mail));
  } catch (e) {
    reject(e);
  }
});

export default { send };
