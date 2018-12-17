import user from './queries/user';

import { signUp, logIn, verify } from './mutations/user';
import { updateApplication, submitApplication } from './mutations/application';

const resolvers = {
  Query: {
    user,
  },
  Mutation: {
    signUp,
    logIn,
    verify,
    updateApplication,
    submitApplication,
  },
};

export default resolvers;
