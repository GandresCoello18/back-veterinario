import express from 'express';
import { auth } from '../../middlewares/auth';

import { getPacients, getPacient, newPacients, changeDueno, removePacients } from './controller';

const router = express.Router();
const baseURL = '/pacients';

router.get(`${baseURL}/:idPacient`, auth, getPacient);
router.get(`${baseURL}`, auth, getPacients);
router.post(`${baseURL}`, auth, newPacients);
router.put(`${baseURL}/dueno/:idPacient`, auth, changeDueno);
router.delete(`${baseURL}/:idPacient`, auth, removePacients);

export default router;
