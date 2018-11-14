import { signUp, logIn } from './mutations/user';
import { updateApplication, submitApplication } from './mutations/application';

const info = () => 'This is a GraphQL Server';

const resolvers = {
  Query: {
    info,
  },
  Mutation: {
    signUp,
    logIn,
    updateApplication,
    submitApplication,
  },
};

export default resolvers;
