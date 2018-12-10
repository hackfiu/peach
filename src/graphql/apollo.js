import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema.gql';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
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

export default server;
