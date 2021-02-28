import express from 'express';
import { auth } from '../../middlewares/auth';

import { getVacunas } from './controller';

const router = express.Router();
const baseURL = '/vacunas';

router.get(`${baseURL}/:tipoPacient/:idPacient`, auth, getVacunas);

export default router;
