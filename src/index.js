import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema.gql';
import resolvers from './resolvers';

dotenv.config();
const { PORT, SECRET } = process.env;

const app = express();
app.use(jwt({ secret: SECRET }).unless({ path: ['/graphql'] }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    if (req.user) {
      const { email, level } = req.user;
      return { email, level };
    }
    return { email: null, level: null };
  },
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🍑  Server up on http://localhost:${PORT}${server.graphqlPath}`));
