import express from 'express';
import { auth } from '../../middlewares/auth';

import { getVacunas, getMisVacunas, getMiCalendario } from './controller';

const router = express.Router();
const baseURL = '/vacunas';

router.get(`${baseURL}/mis-calendario/:idPacient`, auth, getMiCalendario);
router.get(`${baseURL}/:tipoPacient/:idPacient`, auth, getMisVacunas);
router.get(`${baseURL}/:tipoPacient`, auth, getVacunas);

export default router;
