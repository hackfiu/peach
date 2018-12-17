import './env';
import './database';

import express from 'express';
import expressJWT from 'express-jwt';

import apollo from './graphql/apollo';

const { PORT, SECRET, SERVER_URL } = process.env;

const app = express();

app.use(expressJWT({ secret: SECRET, credentialsRequired: false }));

apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🍑  Server up on ${SERVER_URL}:${PORT}${apollo.graphqlPath}`));
