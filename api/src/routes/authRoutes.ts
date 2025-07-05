import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

console.log('Registering auth routes...');

router.post('/register', (req, res, next) => {
  console.log('Register route hit:', req.body);
  next();
}, register);

router.post('/login', (req, res, next) => {
  console.log('Login route hit:', req.body);
  next();
}, login);

console.log('Auth routes registered successfully');

export default router;