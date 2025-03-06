import express from 'express'
import { login, refreshAccessToken } from '../controllers/auth'
import { loginUserValidator } from '../validations/auth'

const router = express.Router();

router.post('/login', loginUserValidator, login);
router.post('/token/refresh', refreshAccessToken);

export { router as authRoutes };
