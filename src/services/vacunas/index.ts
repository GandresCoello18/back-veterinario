import express from 'express';
import { auth } from '../../middlewares/auth';

import { createVacunaPacient, getCalendarioGeneral, getNameVacunas, getMisVacunas, getMiCalendario } from './controller';

const router = express.Router();
const baseURL = '/vacunas';

router.post(`${baseURL}`, auth, createVacunaPacient);
router.get(`${baseURL}/mis-calendario/:idPacient`, auth, getMiCalendario);
router.get(`${baseURL}/calendario-general`, auth, getCalendarioGeneral);
router.get(`${baseURL}/:tipoPacient/:idPacient`, auth, getMisVacunas);
router.get(`${baseURL}/:idPacient`, auth, getNameVacunas);

export default router;
