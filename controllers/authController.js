import { errorHandler } from '../handlers/authErrorHandler.js';
import { User } from '../schema/UserSchema.js';

export const login = (req, res) => {
  //user.find
  res.send('Login Success!!!');
};

export const signup = (req, res) => {
  User.create(req.body)
    .then((data) => res.send(data))
    .catch((e) => {
      const errors = errorHandler(e);
      res.json(errors);
    });
};
