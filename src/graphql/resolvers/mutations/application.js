import { ForbiddenError } from 'apollo-server-express';

import userService from '../../../services/user';
import applicationService from '../../../services/application';

const updateApplication = async (root, args, context) => {
  try {
    const { id, level } = context;
    if (!id) {
      throw new ForbiddenError('User is not logged in.');
    }
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    const application = await applicationService.updateApplication(id, args);
    return application;
  } catch (err) {
    throw err;
  }
};

const submitApplication = async (root, args, context) => {
  try {
    const { id, level } = context;
    if (!id) {
      throw new ForbiddenError('User is not logged in.');
    }
    if (level !== 'HACKER') {
      throw new ForbiddenError('User is not a HACKER.');
    }
    const application = await applicationService.updateApplication(id, args);
    await userService.updateStatus(id, 'SUBMITTED');
    console.log(application);
    return application;
  } catch (err) {
    throw err;
  }
};

export { updateApplication, submitApplication };
