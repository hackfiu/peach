import { google } from 'googleapis';

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_FOLDER_ID } = process.env;

const client = new google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, ['https://www.googleapis.com/auth/drive']);

client.authorize()
  .then(() => console.log(`> Connected to Google Drive on ${GOOGLE_CLIENT_EMAIL}`))
  .catch(err => console.error(err));

const drive = google.drive('v3');

/**
 * Creates a file in Google Drive.
 * @param {Object} params The parameters of the file to be uploaded to drive, that is,
 * an object containing the resource, media, returning field.
 */
const createFile = params => (
  new Promise((resolve, reject) => {
    drive.files.create(params, (err, { id }) => {
      if (err) {
        reject(err);
      }
      resolve(id);
    });
  })
);

/**
 * Uploads a given file to Google Drive.
 * @param {Object} file The file to be uploaded.
 * @param {string} file.name The name of the file.
 * @param {string} file.mimeType The mimetype of the file.
 * @param {*} file.body The readStream body.
 */
const upload = async (file) => {
  const { name, mimeType, body } = file;
  const resource = { name, mimeType };
  const media = { mimeType, body };
  const parents = [GOOGLE_FOLDER_ID];
  try {
    const id = await createFile({
      resource, media, fields: 'id', parents,
    });
    return id;
  } catch (err) {
    throw err;
  }
};

export default { upload };
