import applicationService from '../../../services/application';

const updateApplication = async (root, args, context) => {
  try {
    const { id } = context;
    const application = await applicationService.update(id, args);
    return application;
  } catch (err) {
    throw err;
  }
};

const submitApplication = async (root, args, context) => {
  try {
    const { id } = context;
    const application = await applicationService.submit(id, args);
    return application;
  } catch (err) {
    throw err;
  }
};

export { updateApplication, submitApplication };
