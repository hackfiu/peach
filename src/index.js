import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema.gql';
import resolvers from './graphql/resolvers';

import { initSequelize } from './models';
import router from './routes';

dotenv.config();
const { PORT, SECRET, SERVER_URL } = process.env;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return req.user;
  },
});

app.use(jwt({ secret: SECRET, credentialsRequired: false }));
app.use('/api', router);

server.applyMiddleware({ app });

initSequelize();

app.listen({ port: PORT }, () => console.log(`🍑  Server up on ${SERVER_URL}:${PORT}${server.graphqlPath}`));
