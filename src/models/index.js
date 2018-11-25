import mongoose from 'mongoose';
import ApplicationSchema from './application';
import UserSchema from './user';

const Application = ApplicationSchema(mongoose);
const User = UserSchema(mongoose, Application);

export default User;
