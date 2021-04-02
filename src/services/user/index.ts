import express from 'express';
import { auth } from '../../middlewares/auth';

import { getUserByPacient, getUser, login, newUser, getUsers, updateMe, updateUser, deleteUser } from './controller';

const router = express.Router();
const baseURL = '/users';

router.get(`${baseURL}/byPacient/:idPacient`, auth, getUserByPacient);
router.get(`${baseURL}/me`, auth, getUser);
router.get(`${baseURL}/`, auth, getUsers);
router.post(`${baseURL}/`, auth, newUser);
router.post(`${baseURL}/login`, login);
router.put(`${baseURL}/me`, auth, updateMe);
router.put(`${baseURL}/:idUser`, auth, updateUser);
router.delete(`${baseURL}/:idUser`, auth, deleteUser);

export default router;
