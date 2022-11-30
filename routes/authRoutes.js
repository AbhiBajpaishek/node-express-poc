import { Router } from 'express';
import { login, otp, signup } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/api/login', login);

authRouter.post('/api/signup', signup);

authRouter.post('/api/otp', otp);
