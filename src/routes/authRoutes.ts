import express from 'express';
import {
    login, register, showAllUsers
} from '../controllers/authController';
import { verifyToken } from '../Middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);
router.get('/users', verifyToken, showAllUsers);

export default router;