import mongoose from 'mongoose';
import ApplicationSchema from './application';
import UserDocument from './user';

const Application = ApplicationSchema(mongoose);
const User = UserDocument(mongoose, Application);

export default User;
