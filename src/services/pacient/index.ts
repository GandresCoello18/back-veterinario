import express from 'express';
import { auth } from '../../middlewares/auth';

import { getPacients, newPacients } from './controller';

const router = express.Router();
const baseURL = '/pacients';

router.get(`${baseURL}`, auth, getPacients);
router.post(`${baseURL}`, auth, newPacients);

export default router;
