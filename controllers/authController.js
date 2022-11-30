import { errorHandler } from '../handlers/authErrorHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../schema/UserSchema.js';
import twilio from 'twilio';

export const createJwt = (id) => {
  const uuid = jwt.sign({ id }, 'my jwt secret');
  return uuid;
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  User.login({ email, password })
    .then((user) => {
      const jwt = createJwt(user.id);
      res.cookie('user_uuid', jwt, { httpOnly: true });
      res.status(200).json(user);
    })
    .catch((e) => {
      const err = errorHandler(e);
      res.status(400).json(err);
    });
};

export const signup = (req, res) => {
  User.create(req.body)
    .then((data) => res.send(data))
    .catch((e) => {
      const errors = errorHandler(e);
      res.json(errors);
    });
};

const sendOtp = async (number, otp) => {
  const accountSid = 'AC728572ab983ade9842e559f69ce8242a'; // Your Account SID from www.twilio.com/console
  const authToken = '33fa64ad8393ecb2a7582f8c0c545a65'; // Your Auth Token from www.twilio.com/console
  const client = twilio(accountSid, authToken);

  return client.messages.create({
    body: 'Hello from Zomato Clone, PLease use this OTP: ' + otp + ' to login.',
    to: '+91' + number, // Text this number
    from: '+16402214281', // From a valid Twilio number
  });
};

export const otp = async (req, res) => {
  const { number } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  sendOtp(number, otp)
    .then((success) => {
      console.info(success);
      res.json({ errors: '', otp });
    })
    .catch((err) => {
      console.error(err);
      res.send({ errors: err });
    });
};
