import { Router } from 'express';
import { login, signup } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/api/login', login);

authRouter.post('/api/signup', signup);
