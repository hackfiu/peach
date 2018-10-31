import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema.gql';
import resolvers from './resolvers';

import verify from './controllers/verify';

dotenv.config();
const { PORT, SECRET } = process.env;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return req.user;
  },
});

app.use(jwt({ secret: SECRET, credentialsRequired: false }));

app.get('/verify', verify);

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🍑  Server up on http://localhost:${PORT}${server.graphqlPath}`));
