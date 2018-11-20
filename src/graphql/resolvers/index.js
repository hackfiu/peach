import { signUp, logIn, verify } from './mutations/user';
import { updateApplication, submitApplication } from './mutations/application';

import user from './queries/user';

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
