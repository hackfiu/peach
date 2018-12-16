import mongoose from 'mongoose';

import ResumeSchema from './resume';
import ApplicationSchema from './application';

import UserModel from './user';

const Resume = ResumeSchema(mongoose);
const Application = ApplicationSchema(mongoose, Resume);
const User = UserModel(mongoose, Application);

export default User;
