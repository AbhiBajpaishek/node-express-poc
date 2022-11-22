import { errorHandler } from '../handlers/authErrorHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../schema/UserSchema.js';

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
