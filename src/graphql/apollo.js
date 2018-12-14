import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema.gql';
import resolvers from './resolvers';

const apollo = new ApolloServer({
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

export default apollo;
