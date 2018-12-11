import './env';
import './database';

import express from 'express';
import expressJWT from 'express-jwt';
import { graphqlUploadExpress } from 'graphql-upload';

import apollo from './graphql/apollo';

const {
  PORT, SECRET, SERVER_URL, MAX_FILE_SIZE, MAX_FILES,
} = process.env;

const app = express();

app.use('/graphql', graphqlUploadExpress({ maxFileSize: MAX_FILE_SIZE, maxFiles: MAX_FILES }));
app.use(expressJWT({ secret: SECRET, credentialsRequired: false }));

apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🍑  Server up on ${SERVER_URL}:${PORT}${apollo.graphqlPath}`));
