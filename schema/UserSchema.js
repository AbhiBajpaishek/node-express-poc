import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (user) {
    console.log(`user.password: ${user.password} and password: ${password}`);
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error('Credentials are wrong!!');
  }
  throw Error(`Email doesn't exist`);
};

export const User = mongoose.model('user', userSchema);
