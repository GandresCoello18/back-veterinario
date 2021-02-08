import express from 'express';
import { auth } from '../../middlewares/auth';

import { getUser, login, newUser, getUsers, updateUser } from './controller';

const router = express.Router();
const baseURL = '/users';

router.get(`${baseURL}/me`, auth, getUser);
router.get(`${baseURL}/`, auth, getUsers);
router.post(`${baseURL}/`, auth, newUser);
router.post(`${baseURL}/login`, login);
router.put(`${baseURL}/me`, auth, updateUser);

export default router;
