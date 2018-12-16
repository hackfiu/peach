import { google } from 'googleapis';

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_FOLDER_ID } = process.env;

const driveScope = 'https://www.googleapis.com/auth/drive';
const createFieldSelector = 'webViewLink';

const auth = new google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, [driveScope]);

const drive = google.drive('v3');


/**
 * Deletes files having the given fields.
 * @param {Object} params
 */
const deleteFiles = async (params) => {
  const { filename } = params;
  try {
    await auth.authorize();
    const ids = drive.files.list({ auth, q: `name = ${filename}` });
    console.log(ids);
  } catch (err) {
    throw err;
  }
};

/**
 * Uploads a given file to Google Drive.
 * @param {Object} file The file to be uploaded.
 * @param {string} file.filename The name of the file.
 * @param {string} file.mimetype The mimetype of the file.
 * @param {ReadStream} file.stream The readStream body.
 */
const upload = async (file) => {
  const { filename, mimetype, stream } = file;
  const media = { mimeType: mimetype, body: stream };
  const parents = [GOOGLE_FOLDER_ID];
  try {
    await auth.authorize();
    await deleteFiles({ filename });
    const { data: { webViewLink } } = await drive.files.create({
      auth, media, requestBody: { name: filename, parents }, fields: createFieldSelector,
    });
    return webViewLink;
  } catch (err) {
    throw err;
  }
};

export default { upload };
