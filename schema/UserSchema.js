import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema({
  email: {
    type: 'string',
    required: [true, 'Email is required'],
    unique: true,
    validate: [isEmail, `hmm... buddy! that's not a valid email address`],
  },
  password: {
    type: 'string',
    required: [true, 'Password is required'],
    minlength: [
      8,
      'Entered Password is shorter than the minimum allowed length (8).',
    ],
  },
});

export const User = mongoose.model('user', userSchema);
