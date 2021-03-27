import express from 'express';
import { auth } from '../../middlewares/auth';

import { createVacunaPacient, getCalendarioGeneral, getNameVacunas, getMisVacunas, updateDateVacuna, getMisVacunasByHistory, getMiCalendario, deleteVacunaPacient } from './controller';

const router = express.Router();
const baseURL = '/vacunas';

router.post(`${baseURL}`, auth, createVacunaPacient);
router.get(`${baseURL}/mis-calendario/:idPacient`, auth, getMiCalendario);
router.get(`${baseURL}/hitorial/:idPacient`, auth, getMisVacunasByHistory);
router.get(`${baseURL}/calendario-general`, auth, getCalendarioGeneral);
router.get(`${baseURL}/:tipoPacient/:idPacient`, auth, getMisVacunas);
router.get(`${baseURL}/:idPacient`, auth, getNameVacunas);
router.put(`${baseURL}/date/:id_vacunas_pacient`, auth, updateDateVacuna);
router.delete(`${baseURL}/:id_vacunas_pacient`, auth, deleteVacunaPacient);

export default router;
