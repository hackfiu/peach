import './env';

import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from './graphql/schema.gql';
import resolvers from './graphql/resolvers';
import './database';

const { PORT, SECRET, SERVER_URL } = process.env;

const app = express()
  .use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 100 }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError(err) {
    console.error(err);
    const { message, extensions: { code } } = err;
    return { message, extensions: { code } };
  },
  context(ctx) {
    const { req } = ctx;
    return req.user;
  },
  uploads: false,
});

app.use(jwt({ secret: SECRET, credentialsRequired: false }));

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🍑  Server up on ${SERVER_URL}:${PORT}${server.graphqlPath}`));
