import { google } from 'googleapis';

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_FOLDER_ID } = process.env;

const driveScope = 'https://www.googleapis.com/auth/drive';
const createFieldSelector = 'webViewLink';

const auth = new google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, [driveScope]);

const drive = google.drive('v3');

/**
 * Uploads a given file to Google Drive.
 * @param {Object} file The file to be uploaded.
 * @param {string} file.name The name of the file.
 * @param {string} file.mimeType The mimetype of the file.
 * @param {*} file.body The readStream body.
 */
const upload = async (file) => {
  const { name, mimeType, body } = file;
  const media = { mimeType, body };
  const parents = [GOOGLE_FOLDER_ID];
  try {
    await auth.authorize();
    const { data: { webViewLink } } = await drive.files.create({
      auth, media, requestBody: { name, parents }, fields: createFieldSelector,
    });
    return webViewLink;
  } catch (err) {
    throw err;
  }
};

export default { upload };
