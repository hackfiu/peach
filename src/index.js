import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema.gql';
import resolvers from './graphql/resolvers';

import { initSequelize } from './models';

const { PORT, SECRET, SERVER_URL } = process.env;

const app = express();

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
});

app.use(jwt({ secret: SECRET, credentialsRequired: false }));

server.applyMiddleware({ app });

initSequelize();

app.listen({ port: PORT }, () => console.log(`🍑  Server up on ${SERVER_URL}:${PORT}${server.graphqlPath}`));
